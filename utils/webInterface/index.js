const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'))

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

module.exports = {
    getBlockNumber,
    getBlockRange,
    getTansactions,
    merge,
    getLatesTxDetailInfo
};
