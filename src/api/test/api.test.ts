import * as compose from 'docker-compose'
import path from 'path'
import fetch from 'node-fetch'
import 'should'

const cwd = path.join(__dirname)
const upOptions: compose.IDockerComposeOptions = {
  cwd,
  commandOptions: ['--build']
}

const composeOptions: compose.IDockerComposeOptions = {
  cwd
}

describe('api', (): void => {
  beforeEach(async () => {
    await compose.upAll(upOptions)
    try {
      const result = await compose.logs('api', composeOptions)
      // console.log(result.out)
    } catch (err) {
      // console.log(err.err)
    }
  })

  describe('when GETting /hello', (): void => {
    it(`should return 'world' `, (done) => {
      setTimeout(async () => {
        const response = await fetch('http://localhost:3000/hello')
        const result = await response.json()
        result.text.should.equal('world')
        return done()
      }, 2000)
    })
  })

  describe('when POSTing /todos', (): void => {
    it(`should insert todo`, (done) => {
      setTimeout(async () => {
        const response1 = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          body: JSON.stringify({ description: 'My first todo' }),
          headers: { 'Content-Type': 'application/json' }
        })
        response1.status.should.equal(201)
        const response2 = await fetch('http://localhost:3000/todos')
        const result = (await response2.json()) as { description: string }[]
        result[0].description.should.equal('My first todo')
        return done()
      }, 2000)
    })
  })

  afterEach(async () => {
    // const result = await compose.ps(composeOptions)
    // console.log(result.data)
    // const result2 = await compose.config(composeOptions)
    // console.log(result2.data.config)
    await compose.down(composeOptions)
  })
})
