const express = require('express');
const User = require('../model/User'); // Adjust path
const app = express()
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(400).send('Invalid username or password');
  }

  // Store user info in session
  req.session.userId = user._id;
  res.send('Login successful');
});


app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Could not log out');
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});
