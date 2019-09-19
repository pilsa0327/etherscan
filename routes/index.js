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
               //console.log(block)
                list += ` 
                <tr>
                    <td>${block.number}</td>
                    <td>${block.miner}</td>
                    <td>${block.transactions.length}</td>
                </tr>
                `
            });                                                          
        } 
        let html = template.HTML(
            `
            <form action="/block" method = "post">    
            <div class="form-group">
                <label for="exampleInputEmail1">Ethereum Blockchain Explorer</label>
                <input type="text" class="form-control" name = "address" id="address" aria-describedby="emailHelp"
                    placeholder="Address / Txn Hash / Block">
            </div>
                <button type="submit" class="btn btn-outline-info">Search</button>
            </form>
            `, list);
        
        return res.send(html)
    });
    


})
module.exports = router;    



