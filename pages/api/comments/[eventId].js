const comments = []

export default function handler(req, res) {
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
      id: new Date().getTime(),
      email,
      name,
      text,
    }
    comments.push(newComment)

    console.log('newComment', newComment)
    return res
      .status(201)
      .send({ message: 'Added comment!', comment: newComment })
  }

  if (req.method === 'GET') {
    return res.send({ comments })
  }
}
