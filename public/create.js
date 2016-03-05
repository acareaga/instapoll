/*jshint -W104 */
/*jshint -W119 */

var socket = io();

// Capture Poll Title, append to Vote and Admin Page
const $pollTitle = $('.poll-title');
const $anonymousResultsButton = $('.anonymous-results');
const $createButton = $('#create-link');

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
  console.log('NEED TO HIDE THE VOTE COUNT');
});



// DATE PICKER
// var dataPicker = document.getElementById('datepicker');
//
// datePicker.pickadate({
//   selectMonths: true, // Creates a dropdown to control month
//   selectYears: 15 // Creates a dropdown of 15 years to control year
// });
