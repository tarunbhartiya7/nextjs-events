const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema({
  email: String,
})
const Newsletter = mongoose.model('Newsletter', newsletterSchema)

module.exports = Newsletter
