const express = require('express')
const app = express()
require('dotenv').config()
const Instruction = require('./models/instructions')
const Answer = require('./models/answers')

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/instructions/:id', (request, response) => {
  Instruction.findById(request.params.id).then(instruction => {
    response.json(instruction)
  })
})

app.post('/api/answers', (request, response) => {
  const body = request.body

  if(!body) {
    return response.status(400).json({ error: 'content missing' })
  }

  const answer = new Answer({
    text: body.text,
  })

  answer.save().then(savedAnswer => {
    response.json(savedAnswer.toJSON())
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})