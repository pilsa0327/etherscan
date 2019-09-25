const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))
const bodyParser = require('body-parser');
const addComma = require('../public/js/addComma');

router.use(bodyParser.urlencoded({ extended: false }));

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

router.get('/:pageId', async function(req, res){
    let pageId = req.params.pageId;
    let txFee = 2000000000000000000;
    await web3.eth.getBlock(pageId, false, async function (err, block) {
        var timestamp = block.timestamp * 1000;
        var date = new Date(timestamp);
        for (let i = 0; i <= block.transactions.length - 1; i++) {
            await web3.eth.getTransaction(block.transactions[i], false, async function (err, tx) {
                await web3.eth.getTransactionReceipt(block.transactions[i].toString(), false, async function (err, txReceipt) {
                    txFee += (tx.gasPrice * txReceipt.gasUsed)
                    //console.log(txFee)
                })
            })
        }
        setTimeout(function () {
            return res.render('block', {
                pageId: pageId, blockNumber: block.number, blockTimestamp: date, blockTransactionsLength: block.transactions.length, blockMiner: block.miner,
                blockDifficulty: addComma(block.difficulty), blockTotalDifficulty: addComma(block.totalDifficulty), blockSize: addComma(block.size), blockGasUsed: addComma(block.gasUsed), blockGasLimit: addComma(block.gasLimit), blockExtraData: block.extraData, blockHash: block.hash,
                blockParentHash: block.parentHash, blockSha3Uncles: block.sha3Uncles, blockNonce: block.nonce, blockReward: web3.utils.fromWei(txFee.toString(10))
            })
        }, 500)
    })
})

module.exports = router;