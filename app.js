var express         = require('express');
var path            = require('path');
var UserModule		= require('./user.model');
var bodyParser      = require('body-parser');
var app				= express();

var users = [];

app.use(express.static(path.join(__dirname, 'public')));

/*
 * we have to add Content-Type: application/json header at client request, otherwise data body is null
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080,'localhost',function(server) {
    console.log('Server listening on port 8080');
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/pages/index.html'));
})

app.post('/addUser', function(req, res) {
	var user = new UserModule(req.body.firstName, req.body.secondName, new Date(req.body.birthDay), Date.now());
	users.push(user);
	res.status(200).send({message: 'Successfully add user'});
});

app.get('/user/:id', function(req, res) {
	users.forEach(function(user) {
		if(user.Id == req.params.id) {
			res.status(200).send(user);
		}
	});
	res.status(404).send({message: 'Invalid Id Provided'});
});

app.put('/user/:id', function(req, res) {
	users.forEach(function(user) {
		if(user.Id == req.params.id) {
			var index = users.findIndex(x => x.Id == user.Id);
			users[index].firstName = req.body.firstName;
			users[index].secondName = req.body.secondName;
			users[index].birthDay = new Date(req.body.birthDay);
			res.status(200).send(users);
		}
	})
	res.status(404).send({message: 'Invalid Id Provided'});
})

app.delete('/user/:id', function(req, res) {
	users.forEach(function(user) {
		if(user.Id == req.params.id) {
			var index = users.findIndex(x => x.Id == user.Id);
			users.splice(index, 1);
			res.status(200).send(users);
		}
	})
	res.status(404).send({message: 'Invalid Id Provided'});
})

app.get('/users', function(req, res) {
	res.status(200).send(users);
});
