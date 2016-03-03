var socket = io();

// socket.emit to only one client, message below
var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

///////////////////////////////////////////////////////////// CREATE VIEW
// DATE PICKER
var dataPicker = document.getElementById('datepicker');

datePicker.pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15 // Creates a dropdown of 15 years to control year
});

///////////////////////////////////////////////////////////// ADMIN VIEW

// LOG VOTE COUNT ON ADMIN
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

///////////////////////////////////////////////////////////// VOTER VIEW

// CHOICES FOR BUTTONS
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

// EMIT THE INDV VOTE CAST BY USER
var myVote = document.getElementById('my-vote');

socket.on('myVoteCast', function (vote) {
  myVote.innerText = vote;
});
