import { connectToDatabase } from '../../helpers/db-util'
import Newsletter from '../../models/newsletter'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      return res.status(422).send({ message: 'Validation failed!' })
    }

    await connectToDatabase()
    const response = await Newsletter.create({ email })

    console.log('response', response)
    return res.status(201).send({ message: 'Signed up!' })
  }
}
