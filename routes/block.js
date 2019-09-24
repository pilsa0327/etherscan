const express = require('express');
const router = express.Router();
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

router.get('/:pageId', async function(req, res){
    let pageId = req.params.pageId;
    
    await web3.eth.getBlock(pageId, false, function (err, block) {
        var timestamp = block.timestamp * 1000;
        var date = new Date(timestamp);
        let txFee = '';

        for (let i = 0; i <= block.transactions.length -1 ; i++) {
            web3.eth.getTransaction(block.transactions[i], false, async function (err, tx) {
                await web3.eth.getTransactionReceipt(block.transactions[i], false, function (err, txReceipt) {
                    txFee += parseInt(txReceipt.gasUsed) * parseInt(tx.gasPrice)
                    
                })
                let blockReward = web3.utils.fromWei(txFee, 'ether');
                blockReward += 2;
                console.log(blockReward)
                return res.render('block', {pageId: pageId, blockNumber: block.number, blockTimestamp: date, blockTransactionsLength: block.transactions.length, blockMiner: block.miner, blockReward : blockReward,
                    blockDifficulty: addComma(block.difficulty), blockTotalDifficulty: addComma(block.totalDifficulty), blockSize: addComma(block.size), blockGasUsed: addComma(block.gasUsed), blockGasLimit: addComma(block.gasLimit), blockExtraData: block.extraData, blockHash: block.hash,
                    blockParentHash: block.parentHash, blockSha3Uncles: block.sha3Uncles, blockNonce: block.nonce})
            })
        }
    })
})

module.exports = router;