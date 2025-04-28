// Backend/controllers/authController.js

const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '..', 'data', 'users.json');

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  const user = usersData.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  return res.json({
    message: 'Login successful!',
    user: { id: user.id, name: user.name, email: user.email }
  });
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    try {
      users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse users file.' });
    }
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  return res.status(201).json({
    message: 'Account created successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
};
