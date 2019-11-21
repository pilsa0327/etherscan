const express = require('express');
const router = express.Router();
const addComma = require('../public/js/addComma');
let web3 = global.web3;

router.get('/:pageId', async function (req, res) {
    let pageId = req.params.pageId;
    await web3.eth.getTransaction(pageId, false, async function (err, tx) {
        if(tx === null || err){
            return res.render('error')
        }
        if(!tx.blockHash) {
            let value = web3.utils.fromWei(tx.value, 'ether');
            let price = web3.utils.fromWei(tx.gasPrice, 'ether');

            return res.render('tx', {
                hash: tx.hash, status: 'Pending', blockNumber: 'Pending', from: tx.from, to: tx.to, value: value,
                gasUsed: 'Pending', gasPrice: price, nonce: tx.nonce, timestamp: 'Pending', txFee: 'Pending', input: tx.input
            })
        }
        await web3.eth.getTransactionReceipt(pageId, false, async function (err, txReceipt) {
            let value = web3.utils.fromWei(tx.value, 'ether');
            let price = web3.utils.fromWei(tx.gasPrice, 'ether');
            let txFee = web3.utils.fromWei((tx.gasPrice * txReceipt.gasUsed).toString(10))
            let status;
      
            await web3.eth.getBlock(tx.blockNumber, false, function (err, block) {
                let timestamp = block.timestamp * 1000;
                let date = new Date(timestamp);
                return res.render('tx', {
                    hash: tx.hash, status: status, blockNumber: tx.blockNumber, from: tx.from, to: tx.to, value: value,
                    gasUsed: addComma(txReceipt.gasUsed), gasPrice: price, nonce: tx.nonce, timestamp: date, txFee: txFee, input: tx.input
                })
            })
        })
    })
})


module.exports = router;



