const express = require('express');
const router = express.Router();
// const wi = require('../utils/webInterface')
const web3Server = require('../config/web3Server')
let web3 = global.web3;

if (!web3) {
    web3 = web3Server.web3Ropsten;
}

const getBlockNumber = async () => {
    const blockNumber = await web3.eth.getBlockNumber()
    return blockNumber
}

const getBlockRange =  async (pos, range=5 ) => {
    /*
        * pos: 기준블럭번호
        * range: 몇개의 블럭을 가져올지
    */
    let blocks = []
    for(let i = 0 ; i < range ; ++i) {
         let b = await web3.eth.getBlock(pos - i)
         blocks.push(b)
    }
    return blocks
}

const getTansactions = async blocks => {
    let txs = await blocks.map(block => block.transactions)
    return txs
}

const merge = multiArray => {
    let cloneMultiArray = [...multiArray]
    let merged = []
  
    for(let i = 0 ; i< multiArray.length ; ++i) {
        merged = merged.concat(cloneMultiArray[i])
    }

    return merged
}

const getLatesTxDetailInfo = async (txs, range=5) => {
    /*
        * txs: 트랜잭션 해시 리스트
        * range: 최신 트랜잭션으로 부터 몇개의 트랜잭션 사엣 정보를 반환할지에 대한 수치
    */
    let txDetails = []

    for (let i = 0 ; i < range ; ++i) {

        let tx = await web3.eth.getTransaction(txs[i])
        txDetails.push(tx)
    }

    return txDetails
}


router.get('/', async function (req, res) {
    // console.log(req)
    // console.log(global.web3.currentProvider.host)
    let { maxCnt=5 } = req.query

    let latest_block_number = await getBlockNumber();
    let blocks = await getBlockRange(latest_block_number, maxCnt );
    let txs = await getTansactions(blocks);
    let latesTxDetailInfo = await getLatesTxDetailInfo(merge(txs), maxCnt)

    return res.render('index', {
        block: blocks[0],
        blocks: blocks,
        txs: latesTxDetailInfo,
    })
})


router.post('/changeNetwork', async function (req, res) {
    let network = req.body.network;

    if(network === 'MainNet') {
        global.web3 = web3Server.web3MainNet
        return res.json({})
    } else {
        global.web3 = web3Server.web3Ropsten
    }
    if(network === 'Kovan') {
        global.web3 = web3Server.web3Kovan
        return res.json({})
    } else {
        global.web3 = web3Server.web3Ropsten
    }

    if(network === 'Rinkeby') {
        global.web3 = web3Server.web3Rinkeby
        return res.json({})
    } else {
        global.web3 = web3Server.web3Ropsten
    }

    if(network === 'Goerli') {
        global.web3 = web3Server.web3Goerli
        return res.json({})
    } else {
        global.web3 = web3Server.web3Ropsten
    }
    
})


module.exports = router;

// count = 0 
// while (count > 5) {
//     data =  getdata()
//     count += data.length
// }