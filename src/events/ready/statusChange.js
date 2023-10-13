const { ActivityType } = require('discord.js');
let status = [
    {
        name: 'разбор РДР',
        type: ActivityType.Custom,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        name: 'Houdini',
        type: ActivityType.Playing,
    },
]
module.exports = (client) => {
    setInterval(() => {
        let rnd = Math.floor(Math.random * status.length);
        client.user.setActivity(status[rnd]);
    }, 10000);
}