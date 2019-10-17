const wi = require('./');

(async function() {
    
    let blockNumber = await wi.getBlockNumber()
    console.log(blockNumber)

    let blocks = await wi.getBlockRange(2, blockNumber)
    console.log(blocks)

    let txs = await wi.getTansactions(blocks)
    console.log(txs)

    let merged = wi.merge(txs)
    console.log(merged)
})()