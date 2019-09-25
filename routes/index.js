const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

router.get('/', function(req, res){
    web3.eth.getBlockNumber(async function (err, rtn) {
        let latest_block_number = rtn;
        let list = ''
        for (let i = 0; i <= 4; i++) {
            await web3.eth.getBlock(latest_block_number - i, false, function (err, block) {
                list += `
                    <tr>
                        <td><a href="/block/${block.number}">${block.number}</a></td>
                        <td><a href="/address/${block.miner}">${block.miner}</a></td>
                        <td>${block.transactions.length}</td>
                    </tr>
                    `
            })
        }

        res.render('index', {list})
    })
/*
        for(let j = 1; j <= 5; j++){
            await web3.eth.getBlock(latest_block_number, async function(err, block){
                //console.log(block.transactions[block.transactions.length-1])
                let blockTx = block.transactions[block.transactions.length-j]
                await web3.eth.getTransaction(blockTx, function(err, tx) {
                    console.log(tx.from)
               
                    txList += ` 
                    <tr>
                        <td><a href="/tx/${blockTx}">${blockTx}</a></td>
                        <td><a href="/address/${tx.from}">${tx.from}</td>
                        <td><a href="/address/${tx.to}">${tx.to}</td>
                    </tr>
                    `  
                })
            })
        }
        let html = template.HTML(blockList, txList);
        return res.send(html)*/
    });

module.exports = router;    



