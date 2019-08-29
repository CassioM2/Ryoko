const CommandStructures = require('./structures/command')

module.exports = {

    /* COMMAND STRUCTURES */

    CommandStructures,
    Command: CommandStructures.Command,
    CommandContext: CommandStructures.CommandContext,
    CommandError: CommandStructures.CommandError,
    CommandParameters: CommandStructures.CommandParameters,
    CommandRequirements: CommandStructures.CommandRequirements,
    Parameter: CommandStructures.Parameter,

    /* COMMAND EXTENSIONS */

    RandomRedditPostCommand: CommandStructures.RandomRedditPostCommand,
    SearchCommand: CommandStructures.SearchCommand,

    /* STRUCTURES */

    Command: require('./structures/command/Command'),
    RyokoEmbed: require('./structures/RyokoEmbed'),
    APIWrapper: require('./structures/APIWrapper'),
    Loader: require('./structures/Loader'),
    Listener: require('./structures/Listener'),
    Module: require('./structures/Module'),


    /* UTILS */

    Constants: require('./utils/Constants'),
    DiscordUtils: require('./utils/DiscordUtils'),
    EmojiUtils: require('./utils/EmojiUtils'),
    MiscUtils: require('./utils/MiscUtils'),
    ColorUtils: require('./utils/ColorUtils'),
    FileUtils: require('./utils/FileUtils'),
    Reddit: require('./utils/Reddit'),
    PermissionUtils: require('./utils/PermissionUtils'),
    Templates: require('./utils/Templates'),
    CUtils: require('./utils/CUtils')
}