/*jshint -W104 */
/*jshint -W119 */

var socket = io();

// socket.emit to only one client, message below
var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

// Capture Poll Title, append to Vote and Admin Page
const $pollTitle = $('.poll-title');
const $anonymousResultsButton = $('.anonymous-results');

// Capture Response collection, append to Vote and Admin Page
const $responseList = $('.response-list');
const $addResponse = $('.add-response');
// ADD RESPONSE BUTTON
$addResponse.click(event, function() {
  $responseList.append(
    `<input type="text" id="poll-response" class="form-control">`
  );
});

$anonymousResultsButton.click(event, function() {
  console.log('NEED TO HIDE THE VOTE COUNT')
})





// On Create, pass Title into generator for routes and Append to Root
const $createButton = document.getElementById('create-link');




// DATE PICKER
// var dataPicker = document.getElementById('datepicker');
//
// datePicker.pickadate({
//   selectMonths: true, // Creates a dropdown to control month
//   selectYears: 15 // Creates a dropdown of 15 years to control year
// });
