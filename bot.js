const { default: axios } = require('axios');
const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const words = require('./words.json')
const BOT_TOKEN = process.env.BOT_TOKEN


const bot = new Discord.Client()
bot.login(BOT_TOKEN);

const randomWord = (limit) => {
	const randomIndex = Math.floor(Math.random() * limit);

	return words[randomIndex];
}

bot.on('ready', evt => {
	console.log(`Logged in as ${bot.user.tag}`)
});

//Used when bot is just added to the server
bot.on("guildCreate", guild => {

	let defaultChannel = "";
	guild.channels.cache.forEach((channel) => {
		if (channel.type == "text" && defaultChannel == "") {
			if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
				defaultChannel = channel;
			}
		}
	})
	//defaultChannel will be the channel object that the bot first finds permissions for
	defaultChannel.send('A bot by Karan Batavia, use #swear <mention someone> to swear at someone.');
	defaultChannel.send('Do not use on someone who is easily offended! XD');


});


bot.on('message', message => {
	if (message.content.startsWith('#swear ')) {
		let targetMember = message.mentions.members.first();

		if (!targetMember) return message.reply('You need to tag a user to swear');
		message.channel.send(`<@${targetMember.user.id}> ${randomWord(words.length)}`);
	}
})


bot.on('message', async message => {
	if (message.content == '#darkjoke') {
		// let number = message.content.split(' ')[1];
		const jokes = await axios.get('https://v2.jokeapi.dev/joke/Dark').then(res => res.data).catch(e => console.log(e))
		message.react('🖕');
		console.log(jokes.category);

		if (jokes.type === "twopart") {
			console.log(`${jokes.setup} \n ${jokes.delivery}`)
			return message.reply(`${jokes.setup} \n ${jokes.delivery}`)
		} else if (jokes.type === "single") {
			console.log(`${jokes.joke}`);
			return message.reply(`${jokes.joke}`);
		}

	}
})