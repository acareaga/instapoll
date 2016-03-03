var socket = io();

// socket.emit to only one client, message below
var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

// Capture Poll Title, append to Vote and Admin Page
var pollTitle = document.getElementById('poll-title');

// Capture Response collection, append to Vote and Admin Page
var responses = document.getElementById('poll-response');

// Shovel New Response into the Responses collection
var addResponse = document.getElementById('add-response');

// On Create, pass Title into generator for routes and Append to Root
var createButton = document.getElementById('create-link');











// DATE PICKER
// var dataPicker = document.getElementById('datepicker');
//
// datePicker.pickadate({
//   selectMonths: true, // Creates a dropdown to control month
//   selectYears: 15 // Creates a dropdown of 15 years to control year
// });
