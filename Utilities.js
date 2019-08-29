class Utilities {
	
	static getMongoDBURL() {
		return process.env.MONGODB_URI;
	}
	
	
	static getAPIKey() {
		return process.env.API_KEY;
	}
	
	static getDBName() {
		return process.env.DATABASE_NAME;
	}
}

module.exports = Utilities