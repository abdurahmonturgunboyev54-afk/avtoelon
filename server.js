const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/avtoelon';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB ulandi');
    app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlamqda`));
  })
  .catch(err => console.log('MongoDB ulanish xatosi:', err));
