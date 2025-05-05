const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;