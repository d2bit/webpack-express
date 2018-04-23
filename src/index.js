import http from 'http'
import app from './server'

const DEFAULT_PORT = 3000

const server = http.createServer(app)
let currentApp = app
server.listen(process.env.PORT || DEFAULT_PORT)

if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
