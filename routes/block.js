var express = require('express');
var router = express.Router();
var template = require('../public/lib/template.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', function(req, res){
    let { address } = req.body;
    return res.redirect(`/block/${address}`)
})

router.get('/:pageId', function(req, res){
    
    let pageId = req.params.pageId;
    web3.eth.getBlock(pageId, false, function(err, block) {
    //console.log(block);
    let html = template.blockPage(pageId, block.number, block.timestamp, block.transactions.length, block.miner,
         '', '', block.difficulty, block.totalDifficulty, block.size, block.gasUsed, block.gasLimit, '')

    return res.send(html)
    })
})




module.exports = router;

