const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  eventId: String,
  email: String,
  name: String,
  text: String,
})
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
