module.exports = {
	name: 'station_create',
	description: 'This command saves a station into the database.',
	args:true,
	usage: '<x-coordinate> <y-coordinate> <station-name [optional, no whitespaces]> <station-role [optional, no whitespaces]>',
	async execute(Stations, message, args) {
		if (args.length > 4) {
			return message.channel.send('You entered more arguments than supported. Did you maybe include a whitespace in the name or role?');
		}

		// Gather information needed for entering a station into the DB
		let [xcoord,ycoord,name,role] = args;
		let userid = message.author.id;
		let username = message.author.username;
		let server = message.channel.name.split(/-+/).shift();
		let dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

		// Enter the station into the db
		try {
			const station = await Stations.create({
				coordinates: xcoord+' '+ycoord,
				name: name,
				role: role,
				userid: userid,
				username: username,
				server: server,
				dateCreated: dateNow,
				dateEdited: '',
			});
			return message.reply(`Station ${station.coordinates} added.`);
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That station already exists.');
			}
			return message.reply('Something went wrong with adding a station.');
		}
	},
};