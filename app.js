const express = require('express');
var app = express(); 
const logger = require('morgan');
var web3 = require('./config/web3Server')
const bodyParser = require('body-parser');

global.web3;

const errRouter = require('./routes/error');
const indexRouter = require('./routes/index');
const blockRouter = require('./routes/block');
const txRouter = require('./routes/tx');
const addressRouter = require('./routes/address');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

app.use('/public', express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use('/', indexRouter);
app.use('/block', blockRouter);
app.use('/tx', txRouter);
app.use('/address', addressRouter);
app.use('/error', errRouter);

// app.use(function(req, res, next) {
//     const web3 = global.web3;
//     res.send(web3)
// })




app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});




module.exports = app;




