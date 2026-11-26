const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin login
router.post('/admin-login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const adminLogin = process.env.ADMIN_LOGIN || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'admin009';

    if (login === adminLogin && password === adminPass) {
      const token = jwt.sign({ role: 'admin', login: 'admin' }, process.env.JWT_SECRET || 'supersecret_jwt_key_avtoelon_2026', { expiresIn: '1d' });
      return res.json({ token, message: 'Muvaffaqiyatli kirildi' });
    }

    res.status(400).json({ message: 'Login yoki parol noto‘g‘ri!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
