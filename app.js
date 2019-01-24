const express = require('express');
const path = require('path');
const lectures = require('./lectures.js');
// Hostname og Part tengist við okkar tölvu.
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// Tengjum við lecture.js skrána. SVo allt geti keyrt saman
app.use('/', lectures);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

/* Villumeðhöndlun ef server lendir í veseni. */
function notFoundHandler(req, res, next) { // eslint-disable-line
  res.status(404).send('404 Not Found');
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  res.status(500).send('Villa!');
}

app.use(notFoundHandler);
app.use(errorHandler);

/* Störtum server */
app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
