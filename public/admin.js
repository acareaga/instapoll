var socket = io();

const $closePoll = $('.close-poll')

// LOG VOTE COUNT ON ADMIN -- NEED TO UPDATE AUTOMATICALLY!
var count = document.getElementById('vote-count');

socket.on('voteCount', function (votes) {
  var votesToDisplay = "Vote Count:";
  for (var vote in votes) {
    votesToDisplay = votesToDisplay + ' ' + vote + ': ' + votes[vote] + ' ';
  }
  count.innerText = votesToDisplay;
});

// EMIT THE NUMBER OF USERS CONNECTED
var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});
