const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const words = require('./words.json')
const BOT_TOKEN = process.env.BOT_TOKEN


const bot = new Discord.Client()
bot.login(BOT_TOKEN);

const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);

    return words[randomIndex];
}

bot.on('ready', evt => {
    console.log(`Logged in as ${bot.user.tag}`)
});


bot.on('message', message => {
    if (message.content.startsWith('#swear ')) {
        console.log(message.content);
    }
})