/*jshint -W104 */
/*jshint -W119 */

const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const generateRoutes = require('./lib/generate-routes');
const Poll = require('./lib/poll');
const votes = {};
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;

if (!module.parent) {
  server.listen(port, function () { console.log('Listening on port ' + port + '.'); });
}

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.polls = {};

////////////////////////////////////////////////////////////// ROUTES
app.get('/', (request, response) => {
  response.render(__dirname + '/views/create');
});

app.post('/poll', (request, response) => {
  // if (!request.body.poll) { return response.sendStatus(400); }
  var id        = generateRoutes.id();
  var adminId   = generateRoutes.adminId();
  var adminPath = generateRoutes.adminPath(request);
  var votePath  = generateRoutes.votePath(request);
  var poll      = new Poll(id, request.body, adminId, adminPath, votePath);

  app.locals.polls[id] = poll;
  response.render(__dirname + '/views/poll', {
    poll: poll
  });
});

app.get('/admin/:id/:adminId', (request, response) => {
  var poll = app.locals.polls[request.params.id];
  response.render(__dirname + '/views/admin', {
    poll: poll
  });
});

app.get('/vote/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];
  response.render(__dirname + '/views/vote', {
    poll: poll
  });
});

/////////////////////////////////////////////////////// SOCKET IO CONNECTIONS
io.on('connection', function (socket) {
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', function (channel, message) {
    var poll = app.locals.polls[request.params.id];

    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', poll.countVotes());
      socket.emit('myVoteCast', 'You voted for "' + message + '"');
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    // delete votes[socket.id];
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});

// socket.emit('statusMessage', 'You have connected.');
// socket.emit('voteCount', Poll.prototype.countVotes());

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
