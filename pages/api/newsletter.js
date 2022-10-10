export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      return res.status(422).send({ message: 'Validation failed!' })
    }

    console.log('email', email)
    return res.status(201).send({ message: 'Signed up!' })
  }
}
