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

var buttons = $('#choices input');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.value, pollId);
  });
}

var myVote = $('#my-vote');
var responseButtons = $('#choices');

socket.on('myVoteCast', function (vote) {
  myVote.empty().append(vote);
  responseButtons.children().remove();
});

var currentVoteItem = $('#vote-item');

socket.on('currentVoteCount',function(votes){
  $('#greeting').text('thank you for voting');
  $('#choices').children().remove();
  currentVoteItem.innerText = votes;
});

var voteCount = $('#vote-count');

socket.on('voteCount', function (votes) {
  var votesToDisplay = "Vote Count: <br><br>";
  for (var vote in votes) {
    votesToDisplay = votesToDisplay + ' ' + vote + ': ' + votes[vote] + '<br>';
  }
  voteCount.empty().append(votesToDisplay);
});

// NEED TO FIX HIDE RESULTS ON ANONYMOUS
socket.on('hideVoteResults', function () {
  count.hide();
});

var connectionCount = $('#connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.empty().append('Connected Users: ' + count);
});

$addResponse.click(event, function() {
  $responseList.append(
    `<div class="input-field">
      <input type="text", name="poll[responses][]", id="poll-response", class="form-control", placeholder='Response'>
    </div>`
  );
});

$closePollButton.click(event, function() {
  socket.send('closePoll', pollId);
});

$anonymousResultsButton.click(event, function() {
  console.log('ANONYMOUS - HIDE THE VOTE COUNT');
  socket.send('anonymousResults', pollId);
});

$createButton.click(event, function() {
  console.log("CREATE CLICKED");
  var date = $timeoutDate;
  var time = $timeoutTime;
  socket.send('pollTimeout', pollId, date, time);
});
