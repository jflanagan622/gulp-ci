// Richwood Scientific Bootcamp
// Basic Node+Express server for
// our test company
var express = require('express');
var app = express();

// Set the port to listen on. 3000 in this case
app.set('port', process.env.PORT || 3000);

// Setup to serve static files
app.use(express.static(__dirname + '/public'));

// Add BodyParser to read HTTP message body
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Morgan for logging
var morgan = require('morgan');
app.use(morgan(':date :remote-addr :method :url :status :response-time ms - :res[content-length]'));
// Kill cache 304 response
app.disable('etag');

// CORS for cross origin calls
// Study link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
var cors = require('cors');
app.use(cors());

// =============================================================================
// Postgres
// =============================================================================
var config = {
	user: 'appuser', 				          // env var: PGUSER
	database: 'little-league', 	// env var: PGDATABASE
	password: 'appuserpass1', 			  // env var: PGPASSWORD
	host: 'hillbillycode.com', 				        // Server hosting the postgres database
	port: 5432, 						          // env var: PGPORT ** CHECK YOUR PORT
	max: 10, 							            // max number of clients in the pool
	idleTimeoutMillis: 30000	 		    // how long a client is allowed to remain idle before being closed
  };
  var Pool = require('pg-pool')
  global.pool = new Pool(config)
  
  // attach an error handler to the pool for when a connected, idle client
  // receives an error by being disconnected, etc
  pool.on('error', function(error, client) {
	// handle this in the same way you would treat process.on('uncaughtException')
	// it is supplied the error as well as the idle client which received the error
	console.log('Pool received an error: ' + error)
  });
  
  
  //-----------------------------------------
  // Startup the server
  app.listen(app.get('port'), function(){
	  console.log( 'The API Server is running at http://localhost:3000');
  });
  
  module.exports = app;
  
//-----------------------------------------
// API routes
//

//-----------------------------------------
// Games

var games = require('./routes/games');

 //Create
app.post('/api/game', games.createGame);

/*Get specific customer
app.get('/api/games', games.readGame);

//Update
app.put('/api/games/:id', games.updateGame);

// Delete
app.delete('/api/games/:id', games.deleteGame);*/


//-----------------------------------------