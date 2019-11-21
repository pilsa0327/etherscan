const express = require('express');
const router = express.Router();
const Web3 = require('web3');
// const wi = require('../utils/webInterface')
const web3Server = require('../config/web3Server')
let g_network = "Ropsten"

// if (!web3) {
//     web3 = web3Server.web3Ropsten;
// }

const getBlockNumber = async () => {
    const blockNumber = await web3.eth.getBlockNumber()
    return blockNumber
}

const getBlockRange = async (pos, range = 5) => {
    /*
        * pos: 기준블럭번호
        * range: 몇개의 블럭을 가져올지
    */
    let blocks = []
    for (let i = 0; i < range; ++i) {
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

    for (let i = 0; i < multiArray.length; ++i) {
        merged = merged.concat(cloneMultiArray[i])
    }

    return merged
}

const getLatesTxDetailInfo = async (txs, range = 5) => {

    /*
        * txs: 트랜잭션 해시 리스트
        * range: 최신 트랜잭션으로 부터 몇개의 트랜잭션 사엣 정보를 반환할지에 대한 수치
    */
    let txDetails = []
    
    for (let i = 0; i < range; ++i) {
        // console.log(txs[i].length)
        if(txs[i]){
            let tx = await web3.eth.getTransaction(txs[i])
            txDetails.push(tx)
            if(!txs[i]){
                break;
            }
        }

    }

    return txDetails
}

getNetworkInfo = async function () {
    let maxCnt = 5
    let latest_block_number = await getBlockNumber();
    let blocks = await getBlockRange(latest_block_number, maxCnt);
    let txs = await getTansactions(blocks);
    let latesTxDetailInfo = await getLatesTxDetailInfo(merge(txs), maxCnt)

    return {
        block: blocks[0],
        blocks: blocks,
        txs: latesTxDetailInfo
    }
}

router.get('/', async function (req, res) {
    web3 = web3Server.web3Ropsten;
    if (req.session.web3) {
        web3 = new Web3(new Web3.providers.HttpProvider(req.session.web3))
    }
    // console.log(req)
    // console.log(global.web3.currentProvider.host)
    let maxCnt = 5

    let latest_block_number = await getBlockNumber();
    let blocks = await getBlockRange(latest_block_number, maxCnt);
    let txs = await getTansactions(blocks);
    let latesTxDetailInfo = await getLatesTxDetailInfo(merge(txs), maxCnt)

    return res.render('index', {
        block: blocks[0],
        blocks: blocks,
        txs: latesTxDetailInfo,
        network: g_network
    })
})

router.post('/', async function (req, res) {
    let { address } = req.body;
    web3 = web3Server.web3Ropsten;
    if (req.session.web3) {
        web3 = new Web3(new Web3.providers.HttpProvider(req.session.web3))
    }
    await web3.eth.getBlockNumber(function (err, rtn) {
        if (address.length === 0 || address > rtn && address.length !== 42 && address.length !== 66) {
            return res.render('error')
        }
        else if (address <= rtn) {
            return res.redirect(`/block/${address}`)
        }
        else if (address.length === 42) {
            let ckAddr = web3.utils.isAddress(address)
            if (ckAddr === false) {
                return res.redirect(`/error`)
            } else {
                return res.redirect(`/address/${address}`)
            }
        }
        else if (address.length === 66) {
            return res.redirect(`/tx/${address}`)
        }
    })
})


router.post('/changeNetwork', async function (req, res) {
    let network = req.body.network;
    g_network = network;


    if (network === 'MainNet') {
        web3 = web3Server.web3MainNet
        req.session.web3 = web3Server.MainNet
        req.session.save(function () { })
        return res.json({});
    }

    else if (network === 'Kovan') {
        web3 = web3Server.web3Kovan
        req.session.web3 = web3Server.Kovan
        req.session.save(function () { })
        return res.json({});
    }

    else if (network === 'Rinkeby') {
        web3 = web3Server.web3Rinkeby
        req.session.web3 = web3Server.Rinkeby
        req.session.save(function () { })
        return res.json({});
    }

    else if (network === 'Goerli') {
        web3 = web3Server.web3Goerli
        req.session.web3 = web3Server.Goerli
        req.session.save(function () { })
        return res.json({})
    }

    else if (network === 'Ropsten') {
        web3 = web3Server.web3Ropsten
        req.session.web3 = web3Server.Ropsten
        req.session.save(function () { })
        return res.json({})
    }
    // else {
    //     web3 = web3Server.web3Ropsten
    //     global.web3 = web3Server.web3Ropsten
    //     return res.send({})
    // }

})


module.exports = router;

// count = 0 
// while (count > 5) {
//     data =  getdata()
//     count += data.length
// }