const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Root route to display tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('index', { tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new task
router.post('/', async (req, res) => {
  try {
    const { task, deadline } = req.body;
    const newTask = new Task({ task, deadline });
    await newTask.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update task completion status
router.post('/update/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to edit a task
router.get('/edit/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task });
  } catch (error) {
    console.error('Error fetching task for editing:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { task, deadline } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { task, deadline });
    res.redirect('/');
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a task
router.post('/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
