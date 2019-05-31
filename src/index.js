var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
  res.send('signup');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('views'));

app.post('/signup', function (req, res) {
	// save user details to your database.
	res.send('Signed Up!');
  });