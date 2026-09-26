require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.cert(require('./serviceAccountKey.json')),
});

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

const User = mongoose.model('User', new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  username:  { type: String, required: true, unique: true, trim: true },
  password:  { type: String, required: function () { return !this.googleId; } },
  googleId:  { type: String, unique: true, sparse: true },
  role:      { type: String, enum: ['customer', 'staff', 'admin'], default: 'customer' },
}, { timestamps: true }));

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' })
      .select('firstName lastName email username createdAt')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (!email || !password || password.length < 8) {
      return res.status(400).json({ message: 'Email and a password of 8+ characters are required' });
    }

    const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (exists) return res.status(409).json({ message: 'Email or username already in use' });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ firstName, lastName, email, username, password: hashed });

    res.status(201).json({ message: 'Account created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    const ok = user && await bcrypt.compare(password, user.password);

    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { email, password, adminCode } = req.body;

    const user = await User.findOne({
      email: (email || '').toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        message: 'This account is not an administrator'
      });
    }

        if (adminCode !== process.env.ADMIN_CODE) {
      console.log('SUBMITTED:', JSON.stringify(adminCode));
      console.log('EXPECTED:', JSON.stringify(process.env.ADMIN_CODE));
      return res.status(401).json({
        message: 'Invalid admin code'
      });
    }

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// GOOGLE SYNC: verifies the Firebase sign-in, then creates or finds the matching MongoDB user
app.post('/api/auth/google-sync', async (req, res) => {
  try {
    const decoded = await admin.auth().verifyIdToken(req.body.idToken);
    if (!decoded.email_verified) return res.status(401).json({ message: 'Email not verified' });

    const email = decoded.email.toLowerCase();
    let user = await User.findOne({ email });

    if (!user) {
      const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'user';
      let username = base, n = 0;
      while (await User.exists({ username })) username = base + (++n);

      user = await User.create({
        firstName: decoded.name?.split(' ')[0] || 'User',
        lastName: decoded.name?.split(' ').slice(1).join(' ') || '-',
        email,
        username,
        googleId: decoded.uid,
      });
    } else if (!user.googleId) {
      user.googleId = decoded.uid;
      await user.save();
    }

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Google sign-in failed' });
  }
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`API running on http://localhost:${process.env.PORT || 5000}`)
);
