const Mongoose = require('mongoose')

const TaskSchema = new Mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
    required: [true, 'title is required']
  },
  description: {
    type: String,
    default: ''
  }
})

module.exports = Mongoose.model('Task', TaskSchema)