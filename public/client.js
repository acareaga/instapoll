/*jshint -W104 */
/*jshint -W119 */
/*jshint -W117 */
/*jshint -W097 */
/*jshint -W083 */
'use strict';

var socket = io();
var pollId = window.location.pathname.split('/')[2];

var $anonymousResultsButton = $('.anonymous-results');
var $closePollButton = $('.close-poll');
var $createButton = $('#create-link');
var $timeoutDate = $('.timeout-date');
var $timeoutTime = $('.timeout-time');
var $responseList = $('.response-list');
var $addResponse = $('.add-response');

// LISTEN TO BUTTON CLICKS ON VOTE
var buttons = $('#choices input');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.value, pollId);
  });
}

// DISPLAY USER CHOICE ON VOTE
var myVote = $('#my-vote');
var responseButtons = $('#choices');
socket.on('myVoteCast', function (vote) {
  responseButtons.children().remove();
  myVote.empty().append(vote);
});

var currentVoteItem = document.getElementById('vote-item');
socket.on('currentVoteCount',function(votes){
  $('#greeting').text('thank you for voting');
  $('#choices').children().remove();
  currentVoteItem.innerText = votes;
});

// DISPLAY POLL TALLY ON VOTE
var count = $('#vote-count');
socket.on('voteCount', function (votes) {
  var votesToDisplay = "Vote Count:";
  for (var vote in votes) {
    votesToDisplay = votesToDisplay + ' ' + vote + ': ' + votes[vote] + ' ';
  }
  count.empty().append(votesToDisplay);
});

// EMIT # USERS CONNECTED ON ADMIN
var connectionCount = $('#connection-count');
socket.on('usersConnected', function (count) {
  connectionCount.empty().append('Connected Users: ' + count);
});

////////////////////////////////////////////////////////////////// JQUERY BUTTON ACTIONS

$addResponse.click(event, function() {
  $responseList.append(
    `<div class="input-field">
      <input type="text", name="poll[responses][]", id="poll-response", class="form-control", placeholder='Response'>
    </div>`
  );
});

$anonymousResultsButton.click(event, function() {
  console.log('ANONYMOUS - HIDE THE VOTE COUNT');
});

$closePollButton.click(event, function() {
  console.log("POLL CLOSE SWITCH");
  socket.send('closePoll', pollId);
});

socket.on('closePoll', function () {
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].className += ' disabled';
  }
});
