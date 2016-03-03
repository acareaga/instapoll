const http = require('http');
const $ = require("jquery");
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

// MAKE SURE SOCKET IO IS BELOW SERVER
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;

if (!module.parent) {
  server.listen(port, function () { console.log('Listening on port ' + port + '.'); });
}

// JADE
app.set('view engine', 'jade');

// HTTP PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// SOCKET IO CONNECTIONS
var votes = {};

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  // io.sockets.emit to all clients
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  // socket.emit to only one client
  socket.emit('statusMessage', 'You have connected.');

  // count votes and show user what they chose
  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
      // emit to indv client the vote they cast
      socket.emit('myVoteCast', 'You voted for "' + message + '"');
    }
  });

  // removes user votes on disconnect
  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});

// COUNT VOTES - REFACTOR w/LODASH
function countVotes(votes) {
  var voteCount = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
  };
  for (var vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}

// ROUTES
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];
  response.render('poll', { poll: poll });
});

// app.get('/polls/:id', (request, response) => {
//   var poll = app.locals.polls[request.params.id];
//   response.render('poll', { poll: poll });
// });
//
// app.post('/polls', (request, response) => {
//   if (!request.body.poll) { return response.sendStatus(400); }
//   var id = generateId();
//   app.locals.polls[id] = request.body.poll;
//   response.redirect('/polls/' + id);
// });

module.exports = server;
