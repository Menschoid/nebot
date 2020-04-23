module.exports = {
	name: 'check_claim',
	aliases: ['goto'],
	description: 'This command checks if a station at the given location would overlap with one in the database.',
	args:true,
	usage: '<x-coordinate> <y-coordinate>',
	async execute(Stations, message, args) {
		if (args.length > 2) {
			return message.channel.send('You entered more arguments than supported.');
		}

		// needed information
		let [xcoord,ycoord] = args;
		let checkCoords = xcoord+' '+ycoord;
		let server = message.channel.name.split(/-+/).shift();
		let minDistance = 11;

		try {
			// load all stations for the given server
			const station = await Stations.findAll({
				where: {
					server: server
				}
			});

			// closest distance, station and owner
			let closestDistance = 0;
			let closestCoords = '';
			let closestName = '';
			let closestOwner = '';

			// iterate over all found stations for the server, if there were any
			if (station.length > 0) {
				for (let i = 0; i < station.length; i++)  {
					// check distance between given coordinates and station
			  		let distance = module.exports.calculateDistance(checkCoords, station[i].coordinates);
		
			  		// update closest Station if this station is closer than closest before
			  		if (i === 0 || distance < closestDistance) {
			  			closestDistance = distance;
			  			closestCoords = station[i].coordinates;
						closestName = station[i].name;
						closestOwner = station[i].username;
			  		}
				}

				// compare closest station to min-Distance
				let reply = '';
				if (closestDistance < minDistance) {
					reply = `Warning! Distance to next station: ${closestDistance} hexes!\nStation: /goto ${closestCoords}. Name: ${closestName}. Owner: ${closestOwner}`;
				} else {
					reply = `All Clear! Next station is ${closestDistance} hexes away.`;
				}
				return message.reply(reply);
			} else {
				// No stations found on the server
				return message.reply(`No stations found on server ${server}.`);
			}
			
		}
		catch (e) {
			console.log('error: '+e.name+'\n');
			console.log('message: '+e.message+'\n');
			return message.reply('There was an error fetching the stations.');
		}
	},
	// Function to calculate the distance between 2 sets of coordinates
	calculateDistance: (checkCoords, stationCoords) => {
		// informations needed
		let [checkX, checkY] = checkCoords.split(/ +/);
		let [stationX, stationY] = stationCoords.split(/ +/);

		// calculate actual distance between the points
		let distance = (Math.abs(+checkX - +stationX) + Math.abs(+checkX + +checkY - +stationX - +stationY) + Math.abs(+checkY - +stationY)) / 2;

		return distance;
	}
};