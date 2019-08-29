const { RichEmbed } = require('discord.js')

module.exports = class RyokoEmbed extends RichEmbed {
    constructor (user, data = {}) {
        super(data)
        this.setColor('#FCA49C')
        if (user) this.setFooter(user.tag, user.avatarURL).setTimestamp()
    }

    setDescriptionFromBlockArray (blocks) {
        this.description = blocks.map(lines => lines.filter(l => !!l).join('\n')).filter(b => !!b.length).join('\n\n')
        return this
    }
}