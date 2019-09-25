const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'))

router.get('/', async function (req, res) {
    await web3.eth.getBlockNumber(async function (err, rtn) {
        let latest_block_number = rtn;
        let bkList = '';
        let txList = '';
        for (let i = 0; i <= 4; i++) {
            await web3.eth.getBlock(latest_block_number - i, false, function (err, block) {
                bkList += `
                    <tr>
                        <td><a href="/block/${block.number}">${block.number}</a></td>
                        <td class="hash-tag text-truncate"><a href="/address/${block.miner}">${block.miner}</a></td>
                        <td>${block.transactions.length}</td>
                    </tr>
                    `
            })
        }
        await web3.eth.getBlock(latest_block_number, async function (err, block) {
            if (block.transactions.length >= 5) {
                for (let j = 1; j <= 5; j++) {
                    let blockTx = block.transactions[block.transactions.length - j]
                    await web3.eth.getTransaction(blockTx, function (err, tx) {
                        txList += ` 
                        <tr>
                            <td class="hash-tag text-truncate"><a href="/tx/${blockTx}">${blockTx}</a></td>
                            <td class="hash-tag text-truncate"><a href="/address/${tx.from}">${tx.from}</td>
                            <td class="hash-tag text-truncate"><a href="/address/${tx.to}">${tx.to}</td>
                        </tr>
                        `
                    })
                }
            } else {
                web3.eth.getBlock(latest_block_number - 1, async function (err, block1) {
                    for (let j = 1; j <= block.transactions.length; j++) {
                        let blockTx1 = block.transactions[block.transactions.length - j]
                        await web3.eth.getTransaction(blockTx1, function (err, tx1) {
                            txList += ` 
                            <tr>
                                <td class="hash-tag text-truncate"><a href="/tx/${blockTx1}">${blockTx1}</a></td>
                                <td class="hash-tag text-truncate"><a href="/address/${tx1.from}">${tx1.from}</td>
                                <td class="hash-tag text-truncate"><a href="/address/${tx1.to}">${tx1.to}</td>
                            </tr>
                            `
                        })
                    }
                    for (let k = 1; k <= 5 - block.transactions.length; k++) {
                        let blockTx2 = block1.transactions[block1.transactions.length - k]
                        await web3.eth.getTransaction(blockTx2, function (err, tx2) {
                            txList += ` 
                            <tr>
                                <td class="hash-tag text-truncate"><a href="/tx/${blockTx2}">${blockTx2}</a></td>
                                <td class="hash-tag text-truncate"><a href="/address/${tx2.from}">${tx2.from}</td>
                                <td class="hash-tag text-truncate"><a href="/address/${tx2.to}">${tx2.to}</td>
                            </tr>
                            `
                        })
                    }
                })
            }
        })
        setTimeout(function () {
            return res.render('index', { bkList, txList })
        }, 2000);
    })

})

module.exports = router;
