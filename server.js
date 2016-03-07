/*jshint -W104 */
/*jshint -W119 */
/*jshint -W093 */

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
app.locals.title = 'InstaPoll';
app.locals.polls = {};

app.get('/', (request, response) => {
  response.render(__dirname + '/views/create');
});

app.post('/poll', (request, response) => {
  var id          = generateRoutes.id();
  var adminId     = generateRoutes.adminId();
  var adminPath   = generateRoutes.adminPath(request);
  var votePath    = generateRoutes.votePath(request);
  var pollChoices = {};
  var active      = true;
  var poll        = new Poll(id, request.body, adminId, adminPath, votePath, active, pollChoices);
  app.locals.polls[id] = poll;

  var newPoll = poll.responses.forEach( function(choice){
    return pollChoices[choice.trim()] = 0;
  });

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

////////////////////////////////////////////////////////////// IO CONNECTIONS
io.on('connection', function (socket) {
  var userVotes = {};
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.on('message', function (channel, message, pollId) {
    if (channel === 'voteCast') {
      userVotes[socket.id] = message;
      socket.emit('voteCount', countVotes(userVotes, pollId));
      socket.emit('myVoteCast', 'You voted for "' + message + '"');
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    socket.emit('adminVoteCount');
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});

function countVotes(userVotes, pollId) {
  var voteCount = app.locals.polls[pollId].pollChoices;
  for (var vote in userVotes) {
    if (userVotes[vote]) {
      voteCount[userVotes[vote]]++;
    } else {
      voteCount[userVotes[vote]] = 1;
    }
  }
  return voteCount;
}





////////////////////////////////////////////////////// ERROR HANDLING
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
