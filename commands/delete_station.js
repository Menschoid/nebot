module.exports = {
	name: 'delete_station',
	description: 'This command allows a user to delete a station he entered into the database.',
	args:true,
	usage: '<x-coordinate> <y-coordinate>',
	async execute(Stations, message, args) {
		if (args.length > 2) {
			return message.channel.send('You entered more arguments than supported.');
		}

		// needed information
		let [xcoord,ycoord,name,role] = args;
		let stationCoords = xcoord+' '+ycoord;
		let userid = message.author.id;
		let server = message.channel.name.split(/-+/).shift();

		try {
			// load station from db
			const station = await Stations.findOne({
				where: {
					coordinates: stationCoords,
					server: server
				}
			});

			// only continue when the id of the message-author === station-owner id
			if (userid == station.get('userid')) {
				const stationDeleted = await Stations.destroy({
					where: {id: station.id}
				});
				return message.reply(`Station at ${stationCoords} deleted.`);
			} else {
				return message.reply(`The station is not yours! You can't delete another persons stations. Hands off!`);
			}
		}
		catch (e) {
			// no station found for given coordinates
			return message.reply('Could find no station at ${stationCoords}.');
		}
	},
};