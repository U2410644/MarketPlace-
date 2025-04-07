// Backend/controllers/authController.js

const fs = require('fs');
const path = require('path');

// Path to the users.json file
const usersFile = path.join(__dirname, '..', 'data', 'users.json');

/**
 * POST /api/auth/login
 * Reads users.json, checks credentials, returns success or failure.
 */
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Read the JSON file
  const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

  // Find the user
  const user = usersData.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  // In a real app, you'd use sessions or JWT. For now, just send success + user info
  return res.json({
    message: 'Login successful!',
    user: { id: user.id, email: user.email }
  });
};
