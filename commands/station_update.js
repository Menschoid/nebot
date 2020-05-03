module.exports = {
	name: 'station_update',
	description: 'This command allows a user to edit a station he entered into the database.',
	args:true,
	usage: '<x-coordinate> <y-coordinate> <station-name [optional, no whitespaces]> <station-role [optional, no whitespaces]>',
	async execute(Stations, message, args) {
		if (args.length > 4) {
			return message.channel.send('You entered more arguments than supported. Did you maybe include a whitespace in the name or role?');
		}

		// needed information
		let [xcoord,ycoord,name,role] = args;
		let stationCoords = xcoord+' '+ycoord;
		let userid = message.author.id;
		let server = message.channel.name.split(/-+/).shift();
		let dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

		try {
			// load the given station
			const station = await Stations.findOne({
				where: {
					coordinates: stationCoords,
					server: server
				}
			});

			// only continue when the id of the message-author === station-owner id
			if (userid == station.get('userid')) {
				const stationEdited = await Stations.update({
						name: name,
						role: role,
						dateEdited: dateNow,
					},
					{
						where: {id: station.id}
					}
				);
				return message.reply(`Station at ${stationCoords} edited. New Name: ${name}. New role: ${role}`);
			} else {
				return message.reply(`The station is not yours! You can't edit another persons stations.`);
			}			
		}
		catch (e) {
			// no station with the given coordinates found
			return message.reply(`Could find no station at ${stationCoords}.`);
		}
	},
};