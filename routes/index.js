const express = require('express');
const router = express.Router();
const wi = require('../utils/webInterface')


router.get('/', async function (req, res) {

    let { maxCnt=5 } = req.query

    let latest_block_number = await wi.getBlockNumber();
    let blocks = await wi.getBlockRange(latest_block_number, maxCnt );
    let txs = await wi.getTansactions(blocks);
    let latesTxDetailInfo = await wi.getLatesTxDetailInfo(wi.merge(txs), maxCnt)

    return res.render('index', {
        block: blocks[0],
        blocks: blocks,
        txs: latesTxDetailInfo,
    })
})

module.exports = router;

// count = 0 
// while (count > 5) {
//     data =  getdata()
//     count += data.length
// }