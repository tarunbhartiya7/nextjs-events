import { connectToDatabase } from '../../../helpers/db-util'
import Comment from '../../../models/comment'

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

    await connectToDatabase()
    const response = await Comment.create(newComment)
    console.log('newComment', response)

    return res
      .status(201)
      .send({ message: 'Added comment!', comment: response })
  }

  if (req.method === 'GET') {
    await connectToDatabase()
    const result = await Comment.find({})
    return res.send({ comments: result })
  }
}
