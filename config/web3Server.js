const Web3 = require('web3');


let MainNet = 'https://mainnet.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'
let Ropsten = 'https://ropsten.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'
let Kovan = 'https://kovan.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'
let Rinkeby = 'https://rinkeby.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'
let Goerli = 'https://goerli.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'


let web3MainNet = new Web3(new Web3.providers.HttpProvider(MainNet))
let web3Ropsten = new Web3(new Web3.providers.HttpProvider(Ropsten))
let web3Kovan = new Web3(new Web3.providers.HttpProvider(Kovan))
let web3Rinkeby = new Web3(new Web3.providers.HttpProvider(Rinkeby))
let web3Goerli = new Web3(new Web3.providers.HttpProvider(Goerli))


module.exports = {
    MainNet, Ropsten, Kovan, Rinkeby, Goerli,
    web3MainNet,
    web3Ropsten,
    web3Kovan,
    web3Rinkeby,
    web3Goerli
}    
