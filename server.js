/*jshint -W104 */
/*jshint -W119 */

const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const generateRoutes = require('./lib/generate-routes');
// const generatePoll = require('./lib/generate-poll');

const Poll = require('./lib/poll');
const votes = {};

// MAKE SURE SOCKET IO IS BELOW SERVER
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;

if (!module.parent) {
  server.listen(port, function () { console.log('Listening on port ' + port + '.'); });
}

// JADE & HTTP PARSER
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', (request, response) => {
  response.render(__dirname + '/views/create');
});

app.post('/poll', (request, response) => {
  // if (!request.body.poll) { return response.sendStatus(400); }
  var voteId    = generateRoutes.voteId();
  var adminId   = generateRoutes.adminId();
  var adminPath = generateRoutes.adminPath(request);
  var votePath  = generateRoutes.votePath(request);
  var poll      = new Poll(voteId, request.body, adminId, adminPath, votePath);

  console.log(adminPath);
  console.log(votePath);
  console.log(poll);

  response.render(__dirname + '/views/poll', {
    poll: poll
  });
});

app.get('/admin/:id', (request, response) => {
  response.render(__dirname + '/views/admin');
});

app.get('/vote/:id', (request, response) => {
  response.render(__dirname + '/views/vote');
});

// app.get('/polls/:id', (request, response) => {
//   var poll = app.locals.polls[request.params.id];
//   response.render('poll', { poll: poll });
// });

// app.post('/polls', (request, response) => {
//   if (!request.body.poll) { return response.sendStatus(400); }
//   var id = generateId();
//   app.locals.polls[id] = request.body.poll;
//   response.redirect('/polls/' + id);
// });

// SOCKET IO CONNECTIONS
io.on('connection', function (socket) {
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  // socket.emit to only one client
  socket.emit('statusMessage', 'You have connected.');
  // NEED TO MAKE DYNAMIC FOR VOTERS TO SEE/UNSEE TALLY
  socket.emit('voteCount', Poll.prototype.countVotes());

  // count votes and show user what they chose
  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      // UPDATES TALLY WHEN NEW USERS VOTE
      socket.emit('voteCount', Poll.prototype.countVotes());
      // emit to indv client the vote they cast
      socket.emit('myVoteCast', 'You voted for "' + message + '"');
    }
  });

  // removes user votes on disconnect
  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});

// ERROR HANDLING
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = server;
