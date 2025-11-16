const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

app.use(cors()); 

const users = require('./users.json');

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Backend: http://localhost:${PORT}/users`);
});