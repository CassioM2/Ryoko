const { CommandContext, Listener, MiscUtils } = require('../')
const INTERVAL = 10 * 1000
const RyokoManager = require('../music/RyokoManager');
const nodes = [{
    host: "localhost", port: 2333, password: "youshallnotpass", region: "pt-br|us"
   }]

module.exports = class MainListener extends Listener {
    constructor (client) {
        super(client)
        this.events = ['ready', 'message']
    }

    onReady () {

        this.user.setPresence({ game: { name: `Felicidade e Gratidão a todos <3` } })

        const pr = [
            {
                name: `@${this.user.username} help | ${this.guilds.size} guilds`,
                url: 'https://twitch.tv/cassiolopes1'
            }, {
                name: `Grand Theft Auto V`,
                type: 'PLAYING'
            }
        ]

        setInterval(() => {
            const presence = pr[Math.floor(Math.random() * pr.length)]
            this.user.setPresence({ game: presence })
        }, INTERVAL)

        if (process.env.LAVALINK_NODES) {
            try {
                if (!Array.isArray(nodes)) throw new Error('PARSE_ERROR')
                this.playerManager = new RyokoManager(this, nodes, {
                    user: this.user.id,
                    shards: 0
                })
                this.log('[32mLavalink connection established!', 'Lavalink')
            } catch (e) {
                this.log(`[31mFailed to establish Lavalink connection - Failed to parse LAVALINK_NODES environment variable.`, 'Music')
            }
        }
    }

    async onMessage (message) {
        if (message.author.bot) return

        const guildId = message.guild && message.guild.id
        const {prefix, language} = await this.modules.configuration.retrieve(guildId, 'prefix language')

        const botMention = this.user.toString()

        const sw = (...s) => s.some(st => message.content.startsWith(st))
        const usedPrefix = sw(botMention, `<@!${this.user.id}>`) ? `${botMention} ` : sw(prefix) ? prefix : null

        if (usedPrefix) {
            const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
            const args = fullCmd.slice(1)
            if (!fullCmd.length) return

            const cmd = fullCmd[0].toLowerCase().trim()
            const command = this.commands.find(c => c.name.toLowerCase() === cmd || (c.aliases && c.aliases.includes(cmd)))
            const commandDocument = message.guild && this.database && await this.database.commands.findOne(command.name, 'manutention');
            if (commandDocument && commandDocument.manutention) return;
            if (command) {

                const context = new CommandContext({
                    defaultPrefix: usedPrefix,
                    aliase: cmd,
                    client: this,
                    prefix,
                    message,
                    command,
                    language
                })
                this.runCommand(command, context, args, language)
                try {
                await this.database.commands.update(command.name, { $inc: { used: +1 }})
            } catch (err) {
                console.log('');
            }
          }
        }
    }
}