var express = require('express');
var router = express.Router();
var template = require('../public/lib/template.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

router.get('/:pageId', function(req, res){
    
    let pageId = req.params.pageId;
    web3.eth.getTransaction(pageId, false, function(err, tx) {
        web3.eth.getTransactionReceipt(pageId, false, function(err, txReceipt){
            let value = web3.utils.fromWei(tx.value, 'ether');
            let price = web3.utils.fromWei(tx.gasPrice, 'ether');
            //console.log(bal);
            
            let html = template.txPage(tx.hash, txReceipt.status, tx.blockNumber, '', tx.from, tx.to, value, '',
            '', addComma(txReceipt.gasUsed), price, tx.nonce, tx.input)
            return res.send(html)
        })
    })
})


module.exports = router;