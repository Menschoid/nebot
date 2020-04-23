module.exports = {
	name: 'show_station',
	description: 'This command loads a station from the database.',
	args:true,
	usage: '<x-coordinate> <y-coordinate>',
	async execute(Stations, message, args) {
		if (args.length > 2) {
			return message.channel.send('You entered more arguments than supported.');
		}

		// Gather needed information
		let [xcoord,ycoord] = args;
		let stationCoords = xcoord+' '+ycoord;
		let server = message.channel.name.split(/-+/).shift();

		// try to load station with the given coordinates
		try {
			const station = await Stations.findOne({
				where: {
					coordinates: stationCoords,
					server: server
				}
			});
			return message.reply(`Station at ${stationCoords} found. Name: ${station.name}. Owner: ${station.username}`);
		}
		catch (e) {
			// no station found
			return message.reply(`there is no station at ${stationCoords}.`);
		}
	},
};