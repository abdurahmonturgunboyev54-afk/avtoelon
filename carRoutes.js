const router = require('express').Router();
const Car = require('../models/Car');
const auth = require('../middleware/auth');

// Get all approved cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cars for admin
router.get('/admin/all', auth, async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create car ad
router.post('/', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const saved = await newCar.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update car status (approve/reject)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Car.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete car
router.delete('/:id', auth, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'E’lon o‘chirildi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
