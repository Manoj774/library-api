const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
});

module.exports = mongoose.model('Author', authorSchema);
