const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const votes = {};
// MAKE SURE SOCKET IO IS BELOW SERVER
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;

// create a new poll with custom routes
const generateRoutes = require('./lib/generate-routes');
const generatePoll = require('./lib/generate-poll');

if (!module.parent) {
  server.listen(port, function () { console.log('Listening on port ' + port + '.'); });
}

// JADE & HTTP PARSER
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// SOCKET IO CONNECTIONS
io.on('connection', function (socket) {
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  // socket.emit to only one client
  socket.emit('statusMessage', 'You have connected.');
  // NEED TO MAKE DYNAMIC FOR VOTERS TO SEE/UNSEE TALLY
  socket.emit('voteCount', countVotes(votes));

  // count votes and show user what they chose
  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      // UPDATES TALLY WHEN NEW USERS VOTE
      socket.emit('voteCount', countVotes(votes));
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

// ROUTES
app.get('/', (request, response) => {
  response.render('create');
});

app.post('/poll', (request, response) => {
  if (!request.body.poll) { return response.sendStatus(400); }

  var sha = generateRoutes.sha();
  var adminPath = generateRoutes.adminPath(request);
  var votePath = generateRoutes.votePath(request);
  var poll = generatePoll.createPoll(sha, request.body)

  response.render('/poll/' + sha, {
    admin: adminPath, vote: votePath, poll: poll
  });
});

app.get('/vote', (request, response) => {
  response.render('vote');
});

app.get('/admin', (request, response) => {
  response.render('admin');
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

// ERROR HANDLING
// development
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = server;
