/*jshint -W104 */
/*jshint -W119 */

var socket = io();
var pollId = window.location.pathname.split('/')[2];

// CHOICES FOR BUTTONS
var buttons = $('#choices input');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log(this.value);
    socket.send('voteCast', this.value, pollId);
  });
}

// socket.emit to only one client, message below
// var statusMessage = $('#status-message');
// socket.on('statusMessage', function (message) {
//   statusMessage.innerText = message;
// });


//////////////////////////////////////////////// ADMIN VIEW
const $closePoll = $('.close-poll')




// EMIT THE INDV VOTE CAST BY USER
var myVote = $('#my-vote');
socket.on('myVoteCast', function (vote) {
  myVote.empty().append(vote);
});

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
