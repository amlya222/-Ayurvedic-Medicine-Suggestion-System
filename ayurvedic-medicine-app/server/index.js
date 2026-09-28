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

const chatRateLimits = new Map();

function limitChatRequests(req, res, next) {
  const now = Date.now();
  const window = chatRateLimits.get(req.ip);
  if (!window || window.resetAt <= now) {
    chatRateLimits.set(req.ip, { count: 1, resetAt: now + 60000 });
  } else if (window.count >= 10) {
    return res.status(429).json({ message: 'Too many messages. Please try again in a minute.' });
  } else {
    window.count += 1;
  }

  if (chatRateLimits.size > 10000) {
    for (const [ip, limit] of chatRateLimits) {
      if (limit.resetAt <= now) chatRateLimits.delete(ip);
    }
  }

  return next();
}

app.post('/api/chat', limitChatRequests, async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ message: 'The chatbot is not configured yet. Add GEMINI_API_KEY to server/.env.' });
  }

  const { messages } = req.body;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 20 ||
    messages.some((message) =>
      !message ||
      !['user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      !message.content.trim() ||
      message.content.length > 4000
    ) ||
    messages[messages.length - 1].role !== 'user'
  ) {
    return res.status(400).json({ message: 'Please send a valid chat message.' });
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const fallbackModel = 'gemini-3.5-flash-lite';
    const requestModel = (requestedModel) => fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(requestedModel)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: 'You are the friendly assistant for the Ayurvedic Medicine Suggestion System website. Help users navigate the site, including Home, Medicine Search, How to Use, Stay Healthy, and Contact Us. Be clear that you cannot access or change their account or search results. You may offer general educational information about Ayurveda, but do not diagnose, prescribe, recommend stopping prescribed treatment, or claim that herbs are proven cures. For personal medical questions, encourage consultation with a qualified healthcare professional. For emergency symptoms, advise seeking emergency services immediately. Keep replies concise and never present website suggestions as a substitute for professional medical advice.'
            }]
          },
          contents: messages.map(({ role, content }) => ({
            role: role === 'assistant' ? 'model' : 'user',
            parts: [{ text: content.trim() }]
          })),
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.5
          }
        }),
        signal: AbortSignal.timeout(30000)
      }
    );

    let response = await requestModel(model);
    let activeModel = model;
    if (response.status === 503 && model !== fallbackModel) {
      console.warn(`Gemini model ${model} is unavailable; retrying with ${fallbackModel}`);
      activeModel = fallbackModel;
      response = await requestModel(fallbackModel);
    }

    if (!response.ok) {
      let providerError;
      try {
        providerError = await response.json();
      } catch {
        providerError = null;
      }

      const errorCode = providerError?.error?.status || providerError?.error?.code;
      console.error('Gemini chat request failed:', response.status, errorCode || 'unknown error', providerError?.error?.message || '');

      if (response.status === 429) {
        return res.status(429).json({ message: 'The Gemini free-tier limit was reached. Check Google AI Studio usage limits or try again later.' });
      }
      if (response.status === 401 || response.status === 403) {
        return res.status(502).json({ message: 'Gemini rejected the API key or project. Check the key and API access in Google AI Studio.' });
      }
      if (response.status === 404) {
        return res.status(502).json({ message: `Gemini model ${activeModel} is unavailable. Check that the model is enabled for this API key.` });
      }
      if (response.status === 503) {
        return res.status(503).json({ message: 'Gemini is temporarily at capacity. Please wait a moment and try again.' });
      }
      return res.status(502).json({ message: 'The assistant is temporarily unavailable. Please try again shortly.' });
    }

    const result = await response.json();
    const answer = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();
    if (!answer) {
      return res.status(502).json({ message: 'The assistant returned an empty response. Please try again.' });
    }

    return res.json({ reply: answer });
  } catch (error) {
    console.error('Chat request error:', error.message);
    return res.status(502).json({ message: 'Could not reach the assistant. Please try again shortly.' });
  }
});


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
  console.log('⚠️  Starting API without MongoDB; database-backed features will be unavailable');
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


