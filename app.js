const express = require('express');
const app = express();
const path = require('path')

var indexRouter = require('./routes/index');
var blockRouter = require('./routes/block');

app.use('/', indexRouter);
app.use('/block', blockRouter);




    



app.listen(3000, function(){
    console.log('3000port start...')
});


