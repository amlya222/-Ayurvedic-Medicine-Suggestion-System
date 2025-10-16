import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory user storage for development
const users = new Map();

// Create a default test user
const defaultUser = {
  id: '1',
  email: 'test@example.com',
  passwordHash: await bcrypt.hash('password123', 10),
  fullName: 'Test User'
};
users.set('test@example.com', defaultUser);

console.log('🔐 Default test user created:');
console.log('   Email: test@example.com');
console.log('   Password: password123');

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.get(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { sub: user.id, email: user.email }, 
      'dev-secret-key', 
      { expiresIn: '7d' }
    );
    
    return res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    if (users.has(email)) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      passwordHash,
      fullName: fullName || 'New User'
    };
    
    users.set(email, user);
    
    return res.status(201).json({ 
      id: user.id, 
      email: user.email, 
      fullName: user.fullName 
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Signup failed' });
  }
});

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const payload = jwt.verify(token, 'dev-secret-key');
    req.userId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

app.get('/api/auth/me', auth, (req, res) => {
  const user = Array.from(users.values()).find(u => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  return res.json({ 
    id: user.id, 
    email: user.email, 
    fullName: user.fullName 
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Simple Auth Server running on http://localhost:${port}`);
  console.log('✅ Ready to handle login requests!');
});

export default app;
