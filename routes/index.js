var express = require('express');
var router = express.Router();
var template = require('../public/lib/template.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'))

router.get('/', function(req, res){
    
    web3.eth.getBlockNumber(async function(err, rtn) {
        let latest_block_number = rtn;
        let list = ''
        for(let i=0; i <= 4 ; i++){
            await web3.eth.getBlock(latest_block_number-i, false, function(err, block) {
               console.log(block.number)
                list += ` 
                <tr>
                    <td><a href="/block/${block.number}">${block.number}</a></td>
                    <td><a href="/address/${block.miner}">${block.miner}</td>
                    <td>${block.transactions.length}</td>
                </tr>
                `
            });                                                          
        } 

        let html = template.HTML(
            `
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="">
                    <img src="../public/images/ether.png" width="" height="40" alt="">
                </a>
                <form class="form-inline" action = "/block" method = "post">
                    <input class="form-control mr-sm-2" type="search" name="address" placeholder="Search by Address/ Txn Hash / Block" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>

            `, list);
        
        return res.send(html)
    });
});
module.exports = router;    



