const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Kirish taqiqlangan, token topilmadi' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key_avtoelon_2026');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Noto‘g‘ri token' });
  }
};
