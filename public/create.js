var socket = io();

// socket.emit to only one client, message below
var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});


// DATE PICKER
// var dataPicker = document.getElementById('datepicker');
//
// datePicker.pickadate({
//   selectMonths: true, // Creates a dropdown to control month
//   selectYears: 15 // Creates a dropdown of 15 years to control year
// });
