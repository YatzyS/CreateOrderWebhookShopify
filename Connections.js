var MongoClient = require('mongodb').MongoClient;
class Connections {
	static getMongoDBDatabaseClient(url) {
		var db;
		const client = new MongoClient(url, { useNewUrlParser: true });
		return client;
	}
}

module.exports = Connections