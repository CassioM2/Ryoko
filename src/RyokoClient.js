const { Client } = require('discord.js')
const Loaders = require('./loaders')

module.exports = class Ryoko extends Client {
  constructor (options = {}) {
    super(options)
    this.initializeLoaders()
  }

  login (token = process.env.RYOKO_CLIENT_TOKEN) {
    return super.login(token)
  }

  guildFind(guild) {
     return this.database.guilds.get(guild.id)
  }

  getEmoji (emoji) {
    const guild = this.guilds.find(g=> g.id ==='614685798297763840');
    return guild.emojis.find(e=>e.name.includes(emoji)) || guild.emojis.find(e=>e.name.includes(emoji.toLowerCase()) || guild.emojis.find(e=>e.name.includes(emoji.toUpperCase()) || guild.emojis.find(e=>e.id.includes(emoji))));
  }

  async findChannel(channelid) {
    return this.channels.get(channelid);
  }

  log (...args) {
    const message = args[0]
    const tags = args.slice(1).map(t => `[34m[${t}][0m`)
    console.log(...tags, message + '[34m')
  }

  logError (...args) {
    const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
    console.error('[LogError]', ...tags, args[args.length - 1])
  }

  runCommand (command, context, args, language) {
    context.setFixedT(this.i18next.getFixedT(language))
    command._run(context, args).catch(this.logError)
  }

  async initializeLoaders () {
    for (let name in Loaders) {
      const loader = new Loaders[name](this)
      let success = false
      try {
        success = await loader.load()
      } catch (e) {
        this.logError(e)
      } finally {
        if (!success && loader.critical) process.exit(1)
      }
    }
  }
}