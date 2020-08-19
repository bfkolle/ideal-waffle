// requirements
const express = require('express');
const app = express();
const port = 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

// trackers
var allClients = [];
var activePlayers = [];

// setup
app.use(express.static("../frontend/dist/frontend"));

app.get('/', (req, res) => {   
	res.sendFile("index.html");
});

// everything socket io related
io.on('connection', (socket) => {

	// this is ideally triggerd on connection after the user has entered a username
	socket.on('addUser', (userName) => {
		socket.userName = userName;
		allClients.push(userName);

		if (!activePlayers.length >= 2){
			activePlayers.push(userName);
		}

		console.log(userName);
	});

	socket.on('testingMessage', (someStuff) => {
		io.emit('testingMessage', someStuff);
	});

	// handles disconnects
	socket.on('disconnect', () => {
		allClients.splice(allClients.indexOf(socket.userName), 1);
		if (activePlayers.indexOf(socket.userName) != -1) {
			activePlayers.splice(allClients.indexOf(socket.userName));
		}
	});

});

// startup
app.listen(port, () => {   
	console.log(`Example app listening at http://localhost:${port}`);
});
