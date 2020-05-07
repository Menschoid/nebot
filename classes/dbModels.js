module.exports = {
	initStations () {
		const sequelize = getDBConnection();
		let stations = sequelize.define('stations', {
			coordinates: {
				type: Sequelize.STRING,
				unique: true,
			},
			name: {
				type: Sequelize.STRING,
				defaultValue: '',
				allowNull: false,
			},
			role: {
				type: Sequelize.STRING,
				defaultValue: '',
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				defaultValue: '',
				allowNull: false,
			},
			userid: Sequelize.BLOB,
			username: Sequelize.STRING,
			server: Sequelize.STRING,
			dateCreated: Sequelize.DATE,
			dateEdited: Sequelize.DATE,
		});
		return stations;
	},
};

// require sequelize
const Sequelize = require('sequelize');

// create db connection
function getDBConnection () {
	// sqlite connection
	const sequelize = new Sequelize('database', 'user', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		// SQLite only
		storage: 'database.sqlite',
	});
	return sequelize;
}