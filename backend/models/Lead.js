const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String },
  status: {
    type:    String,
    enum:    ['new', 'contacted', 'converted'],
    default: 'new'
  },
  assignedTo: { type: String },
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);