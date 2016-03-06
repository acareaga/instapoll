/*jshint -W104 */
/*jshint -W119 */

var socket = io();
var pollId = window.location.pathname.split('/')[2];

// CHOICES FOR BUTTONS
var buttons = $('#choices input');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log(this.value);
    socket.send('voteCast', this.value);
  });
}

// socket.emit to only one client, message below
// var statusMessage = $('#status-message');
// socket.on('statusMessage', function (message) {
//   statusMessage.innerText = message;
// });

// EMIT THE INDV VOTE CAST BY USER
var myVote = $('#my-vote');
socket.on('myVoteCast', function (vote) {
  myVote.innerText = vote;
});

// LOG VOTE COUNT ON USER -- NEED TO MAKE DYNAMIC
var count = $('#vote-count');
socket.on('voteCount', function (votes) {
  var votesToDisplay = "Vote Count:";
  for (var vote in votes) {
    votesToDisplay = votesToDisplay + ' ' + vote + ': ' + votes[vote] + ' ';
  }
  count.innerText = votesToDisplay;
});
