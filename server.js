const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('static'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'InstaPoll';

app.get('/', (request, response) => {
  response.render('index');
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
