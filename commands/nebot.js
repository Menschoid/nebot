module.exports = {
	name: 'nebot',
	aliases: ['help','nebot_help'],
	description: 'This displays informations on how to use this bot.',
	args:false,
	usage: '',
	async execute(Stations, message, args) {
		// require filesystem fs
		const fs = require('fs');

		// reading all commands from commands-folder
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		

		// load discord for MessageEmbed
		const Discord = require('discord.js');
		// load config for prefix
		const { prefix, token } = require('./../config.json');
		
		// create Message with all commands
		const helpEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('NEBot commands')
			.setURL('https://discord.js.org/')
			.setAuthor('NEBot');
		// add all commands with their usage and description
		for (const file of commandFiles) {
			const command = require(`./${file}`);

			helpEmbed.addField( `${prefix}${command.name} ${command.usage}`, `${command.description}`);
		}
		helpEmbed.setTimestamp().setFooter("Because you guys can't remember shit");
		// send message
		message.channel.send(helpEmbed);
	},
};