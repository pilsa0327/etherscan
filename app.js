const express = require('express');
const app = express();
const ejs = require('ejs')
const Web3 = require('web3');
const bodyParser = require('body-parser')
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

app.use('/public', express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('views', __dirname + '/public');

app.get('/', function (req, res) {
    web3.eth.getBlockNumber(async function (err, rtn) {
        let latest_block_number = rtn;
        let list = ''
        for (let i = 0; i <= 4; i++) {
            await web3.eth.getBlock(latest_block_number - i, false, function (err, block) {
                list += ( `<tr><td>${block.number}</td> <td>${block.miner}</td> <td>${block.transactions.length}</td></tr>` )
            })
        }
        res.render('index', {list})
    })

})

app.post('/block', function(req, res) {
    let { address } = req.body;
    console.log(address)
    if (address.length <= 20){
        return res.redirect(`/block/${address}`)
    } else if(address.length<=45){
        return res.redirect(`/addr/${address}`)
    } else if(address.length>45){
        return res.redirect(`/tx/${address}`)
    }
})

app.get('/block/:pageId', function(req, res) {
    let pageId = req.params.pageId;
    web3.eth.getBlock(pageId, false, function(err, block) {
   console.log(block)

    return res.render('block', {pageId: pageId, blockNumber: block.number, blockTimestamp: block.timestamp, blockTransactionsLength: block.transactions.length, blockMiner: block.miner,
        blockDifficulty: block.difficulty, blockTotalDifficulty: block.totalDifficulty, blockSize: block.size, blockGasUsed: block.gasUsed, blockGasLimit: block.gasLimit, blockExtraData: block.extraData, blockHash: block.hash,
        blockParentHash: block.parentHash, blockSha3Uncles: block.sha3Uncles, blockNonce: block.nonce})
    })
})

app.get('/addr/:pageId', function(req, res) {
    let pageId = req.params.pageId;
    web3.eth.getBalance(pageId, function(err, wei){
        bal = web3.utils.fromWei(wei, 'ether');
        return res.render('addr', {addr: pageId, bal})
    })
})

app.get('/tx/:pageId', function(req, res){
    let pageId = req.params.pageId;
    web3.eth.getTransaction(pageId, false, function(err, tx) {
        web3.eth.getTransactionReceipt(pageId, false, function(err, txReceipt){
            console.log(txReceipt);
            
            return res.render('tx', {hash: tx.hash, status: txReceipt.status, blockNumber: tx.blockNumber, from: tx.from, to: tx.to, value: tx.value,
                gasUsed: txReceipt.gasUsed, gasPrice: tx.gasPrice, nonce: tx.nonce, input: tx.input})
        })
    })
})


app.listen(3000, function () {
    console.log('3000port start...')
});


