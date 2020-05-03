module.exports = {
	name: 'station_show',
	description: 'This command loads a station from the database.',
	args:true,
	usage: '<x-coordinate> <y-coordinate>',
	async execute(Stations, message, args) {
		if (args.length > 2) {
			return message.channel.send('You entered more arguments than supported.');
		}

		// Get servername from channel name
		let server = message.channel.name.split(/-+/).shift();
		let userid = message.author.id;

		// Load one station or all?
		if (args[0] === 'all' || args[0] === 'mine') {
			// Load all stations on a server
			try {
				let allStation;
				if (args[0] === 'mine') {
					allStation = await Stations.findAll({
						where: {
							server: server,
							userid: userid
						}
					});
				} else {
					allStation = await Stations.findAll({
						where: {
							server: server
						}
					});
				}

				// Import the discord.js-pagination package
				const paginationEmbed = require('discord.js-pagination');
				// load discord for MessageEmbed
				const Discord = require('discord.js');
	
				let pageTotal = Math.ceil(allStation.length/10);
				let pageCount = 1;
				let entryPage = 1;
				let entryTotal = 0;
				let output = [];

				// creating all the pages
				for (let i = 0; i < pageTotal; i++) {
					// create the page-object
					let header = `All stations on server ${server}: ${allStation.length}`;
					if (args[0] === 'mine') {
						header = `My stations on server ${server}: ${allStation.length}`;
					}
					let page = module.exports.createNewPage(Discord, pageCount, pageTotal, header);

					// set entry-counter for the page
					let entryPage = 1;

					// set entry maximum for this page (10 or whatever is left to the end)
					let nextMaxEntry = entryTotal+10;
					if (nextMaxEntry > allStation.length) {
						nextMaxEntry = allStation.length;
					}
					
					// create up to 10 entries for the page
					for (let e = entryTotal; e < nextMaxEntry; e++) {
						let entryStation = allStation[e].dataValues;
						page.addField( `${entryTotal+1}. ${entryStation.name}: /goto ${entryStation.coordinates}`, `Owner: ${entryStation.username} | Role: ${entryStation.role}`);
						entryTotal++;
						entryPage++;
					}

					// add the page to the output
					output.push(page);
					pageCount++;
				} 
				// return output as paginated message
				paginationEmbed(message, output);
			}
			catch (e) {
				// no stations found
				return message.reply(`there are no stations saved for server ${server} or there was an error with the database.`);
			}

		} else {
			// Load one stations on a server based on given coordinates
			let [xcoord,ycoord] = args;
			let stationCoords = xcoord+' '+ycoord;

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
		}
	},
	createNewPage: (Discord, pageNo, pageTotal, header) => {
		// create Message with all commands
		const page = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(header)
			.setURL('https://discord.js.org/')
			.setAuthor('SAM-Bot');
		return page;
	}
};