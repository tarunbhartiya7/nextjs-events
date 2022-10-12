const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  eventId: String,
  email: String,
  name: String,
  text: String,
})

module.exports =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema)
