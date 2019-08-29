const express = require('express')
const app = express()
const getRawBody = require('raw-body')
const crypto = require('crypto')
const Utilities = require('./Utilities.js')
const Operations = require('./Operations.js');
const Connections = require('./Connections.js');
app.set('view engine', 'ejs');
app.set('views', __dirname)
app.post('/webhooks', async (req, res) => {
  console.log('We got an order!')

  const hmac = req.get('X-Shopify-Hmac-Sha256')

  const body = await getRawBody(req)

  const hash = crypto
    .createHmac('sha256', Utilities.getAPIKey())
    .update(body, 'utf8', 'hex')
    .digest('base64')

  if (hash === hmac) {
    res.sendStatus(200)
	JSONbody = JSON.parse(body.toString('utf8'));
	var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
	var dbName = Utilities.getDBName();
	Operations.addJSONToDB(client, JSONbody, dbName);
  } else {
    res.sendStatus(403)
  }
})


app.get('/edit', async(req, res) => {
	var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
	var dbName = Utilities.getDBName();
	Operations.retriveOrderData(client,dbName, req.query.orderId ,function(result) {
		res.render('edit', {page_title:'Edit Information', data:result});
	});
});

app.get('/makeChanges', async(req, res) => {
	var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
	var dbName = Utilities.getDBName();
	Operations.updatePhoneNumberAndEmailInDB(client, dbName, req.query.phone, req.query.email, req.query.orderId);
	res.redirect('/');
});

app.get('/', async(req, res) => {
	console.log('Welcome to the front');
	var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
	var dbName = Utilities.getDBName();
	Operations.retriveAllOrders(client, dbName, function(result) {
		res.render('table', {page_title:'Customer info', data:result});
	});
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
