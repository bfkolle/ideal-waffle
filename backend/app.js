// requirements
const express = require('express');
const app = express();
const port = 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

// trackers
var allClients = [];
var activePlayers = [];
var activePlayer;
var gameOver = false;

if (process.env.NODE_ENV) {
	// setup for production
	app.use(express.static("../frontend/dist/frontend"));
	
	app.get('/', (req, res) => {   
		res.sendFile("index.html");
	});
} else {
	app.get('/', (req, res) => {
		res.send("Backend is working");
	});
}

// everything socket io related
io.on('connection', (socket) => {

	// this is ideally triggerd on connection after the user has entered a username
	socket.on('addUser', (userName) => {
		socket.userName = userName;
		allClients.push(socket.id);

		if (activePlayers.length < 2){
			activePlayers.push(socket.id);

			if (activePlayers.length = 1){
				activePlayer = socket.id;
				socket.role = "White";
			}
			else {
				socket.role = "Black";
			}
		}
		else {
			socket.role = "Spectator";
		}

		socket.broadcast.emit('newPlayer', socket.userName, socket.role);
		socket.emit('playerList', "temp");

		console.log(`Player ${userName} has connected with ID: ${socket.id}`);
	});

	socket.on('makeMove', (gameState) => {

		if (socket.id == activePlayer){

			activePlayers.shift();
			activePlayers.push(socket.id);
			activePlayer = activePlayer[0]; //io.sockets.sockets[id] <- this gets a particular socket
			io.emit('moveMade', gameState);
			io.sockets.socket[activePlayer].emit('yourTurn');
		}
	});

	socket.on('gameOver', () => {

		if (socket.id == activePlayers[1]){

			io.emit('gameOver', `${socket.userName} has won!`);
			gameOver = true;
		}
	});

	socket.on('startGame', () => {
		if (activePlayers.length == 2){
			io.emit('gameStart');
			io.sockets.sockets[activePlayer].emit('yourTurn');
		}
	});

	socket.on('newGame', () => {
		if (gameOver){
			activePlayers.forEach(id => {
				allClients.shift();
				allClients.push(id);
			});
			activePlayers = [];

			allClients.forEach(id => {
				if (activePlayers.length < 2){
					activePlayers.push(id);
				}
			});

			if (activePlayers.length >= 1){
				activePlayer = activePlayers[0];
			}
		}
	});

	// handles disconnects
	socket.on('disconnect', () => {
		allClients.splice(allClients.indexOf(socket.id), 1);

		if (activePlayers.indexOf(socket.id) != -1) {

			activePlayers.splice(activePlayers.indexOf(socket.id), 1);
			if (!gameOver){

				gameOver = true;
				io.emit('gameOver', `${socket.userName} has disconnected, game over!`);
			}
		}

		console.log(`Player ${socket.userName} has disconnected with ID: ${socket.id}`);
	});

});

server.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
