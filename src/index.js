require('dotenv').config();
const { Client, IntentsBitField, Guild } = require('discord.js');
const { default: mongoose } = require('mongoose');
const eventHandler = require('./handlers/eventHandler.js');

let client;
try{
 client = new Client({
    fetchAllMembers: true,
    intents: [
        IntentsBitField.Flags.Guilds,
       IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ]
});
async function start() {
    try {
        mongoose.connect(process.env.MONGO_URI, {keepAlive: true});
        console.log('DB connected!');

        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log('DB Error:', error);
    }
};

start();
} catch {
    console.log('login err');
}