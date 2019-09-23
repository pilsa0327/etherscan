var express = require('express');
var router = express.Router();
var template = require('../public/lib/template.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

router.get('/:pageId', function(req, res){
    let pageId = req.params.pageId;
    
    web3.eth.getBalance(pageId, function(err, wei){
        bal = web3.utils.fromWei(wei, 'ether');
        
        let html = template.addressPage(pageId, bal + ' ether')
        return res.send(html)
})


})

module.exports = router;