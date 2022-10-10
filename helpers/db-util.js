const mongoose = require('mongoose')

export async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/events')
    console.log('Database connected')
  } catch (error) {
    console.log('Connecting to database failed!')
  }
}
