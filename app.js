const express = require('express'),
        path = require('path'),
        lectures = require('./lectures.js'),
        app = express(),
        port = 3000;

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
     console.log('allt í góðu');
 });

