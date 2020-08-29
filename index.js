// require filesystem fs
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// config file
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

const dbModels = require('./classes/dbModels.js');
const Stations = dbModels.initStations();

// collection for commands
client.commands = new Discord.Collection();

// reading all commands from commands-folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// load all commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	// Syncing models to actual db
	Stations.sync();
	console.log('Ready!');
});

client.on('ready', () => {
	// set bot icon
	client.user.setAvatar('./img/sam_logo.png')
		.then(user => console.log(`New avatar set!`))
		.catch(console.error);

	//set bot activity
	client.user.setActivity('chat', { type: 'WATCHING'})
		.then(user => console.log('New activity set!'))
		.catch(console.error);
});

// Interpreting the message
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Separate the command from the arguments in message
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// If there is no command with that name
	if (!command) {
		console.error('No command found');
		message.reply('No command with that name found!');
	};

	// check for needed args
	if (command.args && (!args.length || args[0] === 'help')) {
		if (!args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
		} 

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		} else {
			reply += `\nNo further help available, sorry.`;
		}

		return message.channel.send(reply);
	}

	// try execute command
	try {
		command.execute(Stations, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// login to Discord with your app's token
client.login(token);