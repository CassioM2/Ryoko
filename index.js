const RyokoClient = require('./src/RyokoClient');
require('dotenv').config();
const client = new RyokoClient({
    fetchAllMembers: true,
    disableEveryone: true,
    shards: 0
})

client.login();