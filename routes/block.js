var express = require('express');
var router = express.Router();
var template = require('../public/lib/template.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}


router.post('/', function(req, res){
    let { address } = req.body;
    console.log(address)
    if (address.length <= 20){
        return res.redirect(`/block/${address}`)
    } else if(address.length<=45){
        return res.redirect(`/address/${address}`)
    } else if(address.length>45){
        return res.redirect(`/tx/${address}`)
    }
})

router.get('/:pageId', function(req, res){
    
    let pageId = req.params.pageId;
    web3.eth.getBlock(pageId, false, function(err, block) {
   // console.log(block);
   typeof(block.timestamp)
   var timestamp = block.timestamp * 1000;
   var date = new Date(timestamp);
   

    let html = template.blockPage(pageId, block.number, date, block.transactions.length, block.miner,
         '', '', addComma(block.difficulty), addComma(block.totalDifficulty), addComma(block.size), addComma(block.gasUsed), addComma(block.gasLimit), block.extraData, block.hash,
         block.parentHash, block.sha3Uncles, block.nonce)
    return res.send(html)
    })
})

module.exports = router;




//class="form-inline"   mr-sm-2 class="form-control"