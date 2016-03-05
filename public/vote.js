/*jshint -W104 */
/*jshint -W119 */

var socket = io();

// CHOICES FOR BUTTONS
var buttons = document.querySelectorAll('#choices button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

// socket.emit to only one client, message below
var statusMessage = document.getElementById('status-message');
socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

// EMIT THE INDV VOTE CAST BY USER
var myVote = document.getElementById('my-vote');
socket.on('myVoteCast', function (vote) {
  myVote.innerText = vote;
});

// LOG VOTE COUNT ON USER -- NEED TO MAKE DYNAMIC
var count = document.getElementById('vote-count');
socket.on('voteCount', function (votes) {
  var votesToDisplay = "Vote Count:";
  for (var vote in votes) {
    votesToDisplay = votesToDisplay + ' ' + vote + ': ' + votes[vote] + ' ';
  }
  count.innerText = votesToDisplay;
});
