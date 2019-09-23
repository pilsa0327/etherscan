const express = require('express');
const app = express();
const path = require('path')

var indexRouter = require('./routes/index');
var blockRouter = require('./routes/block');
var txRouter = require('./routes/tx');
var addressRouter = require('./routes/address');

app.use('/public', express.static(__dirname + "/public"));
app.use('/', indexRouter);
app.use('/block', blockRouter);
app.use('/tx', txRouter);
app.use('/address', addressRouter);


    



app.listen(3000, function(){
    console.log('3000port start...')
});


