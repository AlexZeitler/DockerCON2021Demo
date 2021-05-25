import express from 'express'
const app = express()
import { MongoClient } from 'mongodb'
import { json } from 'body-parser'

type Todo = {
  description: string
}

app.use(json())

app.get('/hello', (req, res) => {
  res.status(200).send({ text: 'world' })
})

app.post('/todos', async (req, res) => {
  const client = await MongoClient.connect('mongodb://db:27017/', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  const db = client.db('dockercondemo')
  const todos = db.collection('todos')
  const todo = req.body
  await todos.insertOne(todo)
  await client.close()
  return res.status(201).send()
})

app.get('/todos', async (req, res) => {
  console.log('creating todo')
  const client = await MongoClient.connect('mongodb://db:27017/', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  const db = client.db('dockercondemo')
  const todos = db.collection('todos')

  const result = await todos.find({}).toArray()
  await client.close()
  return res.status(200).send(result)
})

export default app
