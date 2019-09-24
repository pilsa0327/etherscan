const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

router.get('/:pageId', function(req, res){
    let pageId = req.params.pageId;
    web3.eth.getBalance(pageId, function(err, wei){
        bal = web3.utils.fromWei(wei, 'ether');
        return res.render('address', {addr: pageId, bal})
    })

})

module.exports = router;