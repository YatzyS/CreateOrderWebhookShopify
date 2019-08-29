class Operations {

	static addJSONToDB(client, JSONObjectString, dbName) {
		client.connect(function(err, client) {
			if(err) {
				console.log(err);	
			}
			const db = client.db(dbName);
			db.collection('OrderInfo').insert(JSONObjectString, function(err, result) {
				if(err) {
					console.log('Error');
				}
				else {
					console.log('Success');
				}
			});
			client.close();
		});
	}
	
	static updatePhoneNumberAndEmailInDB(client, dbName, newNumber, newEmail, orderId) {
		client.connect(function(err, client) {
			const db = client.db(dbName);
			db.collection('OrderInfo').updateOne(
				{id : Number(orderId)},
				{
					$set : { 'customer.phone': newNumber , 'customer.email': newEmail,  email : newEmail }
				}
			);
			client.close();
		});
		
	}
	
	
	static retriveAllOrders(client, dbName, callback) {
		client.connect(function(err, client) {
			if(err) {
				console.log(err);
			}
			const db = client.db(dbName);
			db.collection('OrderInfo').find({}, { projection: {_id:0, id:1,  'customer.first_name':1, 'customer.last_name':1, 'customer.email':1, 'customer.phone':1}}).toArray(function(err, result) {
				if(err) console.log(err);
				callback(result);
			})
		});	
	}
	
	static retriveOrderData(client, dbName, orderId, callback) {
		client.connect(function(err, client) {
			if(err) {
				console.log(err);
			}
			const db = client.db(dbName);
			var query = {id: Number(orderId)};
			console.log(query);
			db.collection('OrderInfo').find(query, { projection: {_id:0, id:1,  'customer.first_name':1, 'customer.last_name':1, 'customer.email':1, 'customer.phone':1}}).limit(1).toArray(function(err, result) {
				if(err) console.log(err);
				callback(result);
			})
		});	
	}
}

module.exports = Operations