const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  data: {
    type: Array,
    value:
    {
      todo: {
        type: String,
        required: true
      },
      label: {
        type: String,
      },
      status: {
        'type': String,
      },
      due: {
        type: Date
      }
    }
  }
})

//create model for todo
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;