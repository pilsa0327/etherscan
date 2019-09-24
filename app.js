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
                //list += (`<tr><td>${block.number}</td> <td>${block.miner}</td> <td>${block.transactions.length}</td></tr>`)
                list += (`
                    <tr>
                        <td><a href="/block/${block.number}">${block.number}</a></td>
                        <td><a href="/address/${block.miner}">${block.miner}</a></td>
                        <td>${block.transactions.length}</td>
                    </tr>
                    `)
                console.log(block.number)
            })
        }
        res.render('index', { list })
    })

})

app.post('/block', function (req, res) {
    let { address } = req.body;
    //console.log(address)
    if (address.length <= 20) {
        return res.redirect(`/block/${address}`)
    } else if (address.length <= 45) {
        return res.redirect(`/address/${address}`)
    } else if (address.length > 45) {
        return res.redirect(`/tx/${address}`)
    }
})
app.get('/block/:pageId', async function (req, res) {
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
        }, 2000)
    })
})
app.get('/address/:pageId', function (req, res) {
    let pageId = req.params.pageId;
    web3.eth.getBalance(pageId, function (err, wei) {
        bal = web3.utils.fromWei(wei, 'ether');
        return res.render('address', { address: pageId, bal })
    })
})

app.get('/tx/:pageId', function (req, res) {
    let pageId = req.params.pageId;
    web3.eth.getTransaction(pageId, false, function (err, tx) {
        web3.eth.getTransactionReceipt(pageId, false, function (err, txReceipt) {
            //console.log(txReceipt);

            return res.render('tx', {
                hash: tx.hash, status: txReceipt.status, blockNumber: tx.blockNumber, from: tx.from, to: tx.to, value: tx.value,
                gasUsed: txReceipt.gasUsed, gasPrice: tx.gasPrice, nonce: tx.nonce, input: tx.input
            })
        })
    })
})


app.listen(3000, function () {
    console.log('3000port start...')
});

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}


