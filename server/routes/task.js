const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'SECRET_KEY'
    );
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Create Task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, quadrant, dueDate } = req.body;
    const newTask = new Task({
      userId: req.userId,
      title,
      description,
      quadrant,
      dueDate,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Tasks (for the logged-in user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
