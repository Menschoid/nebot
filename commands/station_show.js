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

		// Load one station or all?
		if (args[0] === 'all') {
			// Load all stations on a server
			try {
				const allStation = await Stations.findAll({
					where: {
						server: server
					}
				});


				// Import the discord.js-pagination package
				const paginationEmbed = require('discord.js-pagination');
				// load discord for MessageEmbed
				const Discord = require('discord.js');
	
				let pageTotal = Math.ceil(allStation.length/10);
				let pageCount = 1;
				let entryPage = 1;
				let entryTotal = 1;
				let output = [];

				//let page = module.exports.createNewPage(Discord, pageCount, pageTotal);

				//const page = new Discord.MessageEmbed()
				//	.setColor('#0099ff')
				//	.setTitle(`Station list`)
				//	.setURL('https://discord.js.org/')
				//	.setAuthor('NEBot');

				for (let i = 0; i < allStation.length; i++)  {
					//if(entryPage === 1) {
					//	// create page
					//	let page = module.exports.createNewPage(Discord, pageCount, pageTotal);
					//}
					let page = module.exports.createNewPage(Discord, pageCount, pageTotal);
					// create entry into page
					page.addField( `${entryTotal}. ${allStation[i].name}: /goto ${allStation[i].coordinates}`, `Owner: ${allStation[i].username} | Role: ${allStation[i].role}`);
					page.addField( `${entryTotal}. ${allStation[i].name}: /goto ${allStation[i].coordinates}`, `Owner: ${allStation[i].username} | Role: ${allStation[i].role}`);
					// count up entry number and total processed entry number
					entryPage++;
					entryTotal++;

					// Full 10 entries are one page or if the list is done
					if (entryPage > 9 || i === allStation.length-1) {
						//reset entries
						entryPage = 1;
						// push page into outputArray
						output.push(page);
						pageCount++;
					}
				}
				console.log(output);

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
	createNewPage: (Discord, pageNo, pageTotal) => {
		// create Message with all commands
		const page = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Station list')
			.setURL('https://discord.js.org/')
			.setAuthor('SAM-Bot');
		return page;
	}
};