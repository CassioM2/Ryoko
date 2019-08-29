const { Loader } = require('../')
const { MongoDB } = require('../database')

module.exports = class DatabaseLoader extends Loader {
    constructor (client) {
        super(client)

        this.database = null
    }

    async load () {
        try {
            await this.initializeDatabase(MongoDB, { useNewUrlParser: true })
            this.client.database = this.database
            return true
        } catch (e) {
            this.logError(e)
        }
        return false
    }

    initializeDatabase (DBWrapper = MongoDB, options = {}) {
        this.database = new DBWrapper(options)
        this.database.connect()
            .then(() => this.log('[32mMongoDB was successfully connected!', 'MongoDB'))
            .catch(e => {
                this.logError('MongoDB', e.message)
                this.database = null
            })
    }
}