const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema({
  email: String,
})

module.exports =
  mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema)
