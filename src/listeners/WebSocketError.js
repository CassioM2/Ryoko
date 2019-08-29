const { Listener } = require('../')

module.exports = class WebSocketError extends Listener {
  constructor (client) {
    super(client)
    this.events = ['error']
  }

  async onError (error) {
    console.log(error)
    process.exit(1)
  }
}