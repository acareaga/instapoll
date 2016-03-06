/*jshint -W104 */
/*jshint -W119 */

const socket = io();

const $pollTitle = $('.poll-title');
const $anonymousResultsButton = $('.anonymous-results');
const $createButton = $('#create-link');

const $responseList = $('.response-list');
const $addResponse = $('.add-response');

$addResponse.click(event, function() {
  $responseList.append(
    `<div class="input-field">
      <input type="text", name="poll[responses][]", id="poll-response", class="form-control", placeholder='Response'>
    </div>`
  );
});

$anonymousResultsButton.click(event, function() {
  console.log('NEED TO HIDE THE VOTE COUNT');
});

// DATE PICKER
$('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    format: 'dd-mm-yyyy' });
