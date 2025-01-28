const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  deadline: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
