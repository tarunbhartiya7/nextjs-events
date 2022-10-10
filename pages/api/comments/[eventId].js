import Comment from '../../../models/comment'
const mongoose = require('mongoose')

const comments = []

export default async function handler(req, res) {
  const { eventId } = req.query

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email ||
      !email.includes('@') ||
      name.trim() === '' ||
      text.trim() === '' ||
      !name ||
      !text
    ) {
      return res.status(422).send({ message: 'Validation failed!' })
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    }

    await mongoose.connect('mongodb://localhost/events')
    const response = await Comment.create(newComment)
    console.log('newComment', response)

    return res
      .status(201)
      .send({ message: 'Added comment!', comment: response })
  }

  if (req.method === 'GET') {
    await mongoose.connect('mongodb://localhost/events')
    const result = await Comment.find({})
    return res.send({ comments: result })
  }
}
