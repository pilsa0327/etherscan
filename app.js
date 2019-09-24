const express = require('express');
const app = express();
const ejs = require('ejs')
const Web3 = require('web3');
const bodyParser = require('body-parser')
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

const indexRouter = require('./routes/index');
const blockRouter = require('./routes/block');
const txRouter = require('./routes/tx');
const addressRouter = require('./routes/address');

app.use('/public', express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('views', __dirname + "/views");

app.use('/', indexRouter);
app.use('/block', blockRouter);
app.use('/tx', txRouter);
app.use('/address', addressRouter);

app.listen(3000, function () {
    console.log('3000port start...')
});


