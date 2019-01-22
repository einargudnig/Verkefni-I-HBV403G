const express = require('express')
const path = require('path')
const lectures = require('./lectures.js')
const app = express()
const port = 3000;
const hostname = '127.0.01';

 //Use EJS
 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views'));

 app.use(express.static('public'));

 //Lecturelist
 app.use('/', lectures);
 app.use('/html', lectures);
 app.use('/css', lectures);
 app.use('/js', lectures);

 //start server
 app.listen(port, () => {
     console.info('Server running at http://${hostname}:${port}/');
 });

