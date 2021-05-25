import app from './app'

const port = 3000
const server = app.listen(3000, () => {
  console.log(`API server listening on port ${port}`)
})

process.on('SIGINT', () => {
  console.log('stopping API server...')
  server.close()
  console.log('API server stopped')
})

process.on('SIGTERM', () => {
  console.log('stopping API server...')
  server.close()
  console.log('API server stopped')
})
