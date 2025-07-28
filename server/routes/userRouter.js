const express = require('express');
const router = express.Router();
const db = require('../config/db');

 // Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: 'No data available' });
    }
    res.json(results);
  });
});

// Add a new user
router.post('/', (req, res) => {
  const { full_name, email, phone, password_hash, address, role } = req.body;
  db.query(
    'INSERT INTO users (full_name, email, phone, password_hash, address, role) VALUES (?, ?, ?, ?, ?, ?)',
    [full_name, email, phone, password_hash, address, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, full_name, email, phone, role });
    }
  );
});

// Get a single user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});

module.exports = router;