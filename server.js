/*jshint -W104 */
/*jshint -W119 */

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;
const generateRoutes = require('./lib/generate-routes');
const Poll = require('./lib/generate-poll');

if (!module.parent) {
  server.listen(port, function () { console.log('Listening on port ' + port + '.'); });
}

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.polls = {};
app.locals.votes = {};

////////////////////////////////////////////////////////////// ROUTES
app.get('/', (request, response) => {
  response.render(__dirname + '/views/create');
});

app.post('/poll', (request, response) => {
  var id        = generateRoutes.id();
  var adminId   = generateRoutes.adminId();
  var adminPath = generateRoutes.adminPath(request);
  var votePath  = generateRoutes.votePath(request);
  var poll      = new Poll(id, request.body, adminId, adminPath, votePath);
  app.locals.polls[id] = poll;

  response.render(__dirname + '/views/poll', { poll: poll });
});

app.get('/admin/:id/:adminId', (request, response) => {
  var poll = app.locals.polls[request.params.id];
  response.render(__dirname + '/views/admin', { poll: poll });
});

app.get('/vote/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];
  response.render(__dirname + '/views/vote', { poll: poll });
});

/////////////////////////////////////////////////////// SOCKET IO CONNECTIONS
io.on('connection', function (socket) {
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
    var poll = app.locals.polls[message.id];
    if (channel === 'voteCast') {
      poll.votes.push(message);
      socket.emit('voteCount', poll.countVotes());
      socket.emit('myVoteCast', 'You voted for "' + message + '"');
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete app.locals.votes[socket.id];
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});


///////////////////////////////////////////////////////////// ERROR HANDLING
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
