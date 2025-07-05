const Task = require('../models/Task');
const { Op } = require('sequelize');

exports.getAllTasks = async (req, res) => {
  try {
    const { category, status, priority, search } = req.query;
    const where = {};

    if (category) {
      where.categoryId = category;
    }
    if (status) {
      where.completed = status === 'completed';
    }
    if (priority) {
      where.priority = priority;
    }
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    const tasks = await Task.findAll({ where });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing task
exports.updateTask =  async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      return res.status(200).json(updatedTask);
    }
    throw new Error('Task not found.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Task not found.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};