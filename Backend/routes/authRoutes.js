// Backend/routes/authRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFile = path.join(__dirname, '..', 'data', 'users.json');

/**
 * POST /api/auth/register
 * Creates a new user and saves to users.json
 */
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  // Read current users
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  }

  // Check if user with email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists.' });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };
  users.push(newUser);

  // Write back to users.json
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  return res.json({ message: 'Account created successfully', user: { id: newUser.id, name, email } });
});

/**
 * POST /api/auth/login
 * Logs in an existing user by checking users.json
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // In a real app, you'd create a session or JWT token here
  return res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

// Export the router
module.exports = router;
