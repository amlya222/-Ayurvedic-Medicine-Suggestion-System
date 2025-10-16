import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// In-memory store for wellness data
const wellnessDataStore = {};

// Use local MongoDB for development if MONGODB_URI is not set
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurvedic-medicine-dev';

if (!process.env.MONGODB_URI) {
  console.log('⚠️  MONGODB_URI not set, using local MongoDB for development');
  console.log('💡 To use MongoDB Atlas, set MONGODB_URI in your .env file');
}

// MongoDB connection configuration
const mongooseOptions = {
  retryWrites: true,
  w: 'majority'
};

try {
  await mongoose.connect(mongoUri, mongooseOptions);
  console.log('✅ Connected to MongoDB Atlas successfully');
} catch (error) {
  console.error('❌ MongoDB connection error:', error.message);
  console.log('💡 Make sure to:');
  console.log('   1. Create a .env file in the server directory');
  console.log('   2. Add your MongoDB Atlas connection string as MONGODB_URI');
  console.log('   3. Whitelist your IP address in MongoDB Atlas');
  console.log('   4. Check your username/password in the connection string');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  username: { type: String },
  bio: { type: String },
  language: { type: String },
  timezone: { type: String },
  avatarUrl: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, passwordHash });
    return res.status(201).json({ id: user._id, email: user.email, fullName: user.fullName });
  } catch (err) {
    return res.status(500).json({ message: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName } });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed' });
  }
});

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.userId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

app.get('/api/auth/me', auth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  if (!user) return res.status(404).json({ message: 'Not found' });
  return res.json({ id: user._id, email: user.email, fullName: user.fullName, username: user.username, bio: user.bio, language: user.language, timezone: user.timezone, avatarUrl: user.avatarUrl });
});

app.put('/api/profile', auth, async (req, res) => {
  const { fullName, username, bio, language, timezone, avatarUrl } = req.body;
  const update = { fullName, username, bio, language, timezone, avatarUrl };
  Object.keys(update).forEach((k) => update[k] === undefined && delete update[k]);
  const user = await User.findByIdAndUpdate(req.userId, { $set: update }, { new: true }).lean();
  return res.json({ id: user._id, email: user.email, fullName: user.fullName, username: user.username, bio: user.bio, language: user.language, timezone: user.timezone, avatarUrl: user.avatarUrl });
});

app.get('/api/wellness/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(wellnessDataStore[userId] || {});
});

app.post('/api/wellness/:userId', (req, res) => {
  const userId = req.params.userId;
  wellnessDataStore[userId] = req.body;
  res.json({ success: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


