const Task = require('../models/task');

exports.getAllTasks = (req, res) => {
  res.json(Task.getAll());
};

exports.getTaskById = (req, res) => {
  const task = Task.getById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

exports.createTask = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const newTask = Task.create(req.body);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const updatedTask = Task.update(req.params.id, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

exports.deleteTask = (req, res) => {
  const deletedTask = Task.delete(req.params.id);
  if (deletedTask) {
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};