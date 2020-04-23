module.exports = class stations {
	constructor(dbModel, message){
    	this.stationsModel = dbModel ;
    	this.message = message;
 	}

 	async fetch( coords, server) {
		try {
			const station = await this.stationsModel.findOne({
				where: {
					coordinates: coords,
					//server: server
				}
			});
			let stationName = station.get('name');
			let stationOwner = station.get('username');

			return this.message.reply(`Station at ${stationCoords} found. Name: ${stationName}. Owner: ${stationOwner}`);
		}
		catch (e) {
			return this.message.reply('Could find no station at ${stationCoords}.');
		}
 	}
};