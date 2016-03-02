const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

// LOCAL STORE
app.locals.polls = {};

// TEMPLATE, SWITCH TO HANDLEBARS
app.use(express.static('static'));
app.set('view engine', 'jade');

// SETUP FOR PORT AND TITLE
app.set('port', process.env.PORT || 3000);
app.locals.title = 'InstaPoll';

// HTTP PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
app.get('/', (request, response) => {
  response.render('index');
});

app.post('/polls', (request, response) => {
  var id = generateId();
  app.locals.polls[id] = request.body;
  response.sendStatus(201);
});

// LISTENER
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
