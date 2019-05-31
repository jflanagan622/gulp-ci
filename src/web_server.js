//Require Express
console.log("web server starting up");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//var request = require('superagent');
// Set the port to listen on. 80 since it's the web server
// NOTE: su usually required for ports under 1024
app.set('port', process.env.PORT || 3000);

// Setup to serve static files
app.use(express.static(__dirname + '/public'));

// Morgan for logging
var morgan = require('morgan');
app.use(morgan(':date :remote-addr :method :url :status :response-time ms - :res[content-length]'));

//Add  Setup handlebars view engine
var handlebars = require('express-handlebars');
// Point to a default template
app.engine('handlebars', handlebars({defaultLayout: 'main'}));

// Add handlebars to the app
app.set('view engine', 'handlebars');

// Kill cache 304 response
app.disable('etag');

//-----------------------------------------
// Startup the server
app.listen(app.get('port'), function(){
	console.log( 'The Web Server is running. Open a browser and navigate to: http://localhost');
});

//-----------------------------------------

// Welcome page route

app.get('/', function(req,res) {
	res.render('signup');
});

app.get('/signup', function(req,res) {
	// Send the construction page
	res.render('signup');
});

app.get('/teams', function(req,res) {
	// Send the construction page
	res.render('teams');
});

app.get('/schedules', function(req,res) {
	// Send the construction page
	res.render('schedules');
});

app.get('/delete', function(req,res) {
	// Send the construction page
	res.render('delete');
});

/*app.post('/signup', function (req, res) {
	// save user details to your database.
	res.send('Signed Up!');
  });
  var mailchimpInstance   = 'us19',
  listUniqueId        = '2388d8a9aa',
  mailchimpApiKey     = '43f6c9ca952a5f48f1ace3647def00b5-us19';

/*app.post('/signup', function (req, res) {
	
  request
	  .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
	  .set('Content-Type', 'application/json;charset=utf-8')
	  .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
	  .send({
		'email_address': req.body.email,
		'status': 'subscribed',
		'merge_fields': {
		  'FNAME': req.body.firstname,
		  'LNAME': req.body.lastname
		}
	  })
		  .end(function(err, response) {
			if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
			  //res.send("Signed Up!");
			  console.log(response);
			} else {
				console.log(response.status);
				console.log(response.text);
			  res.send('Sign Up Failed :(');
			}
		});
});*/


