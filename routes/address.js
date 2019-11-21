const express = require('express');
const router = express.Router();
let web3 = global.web3;

router.get('/:pageId', async function (req, res) {
    let pageId = req.params.pageId; 
    let addrCheck = await web3.utils.isAddress(pageId)
    if (addrCheck !== true) {
        return res.render('error')
    }
    web3.eth.getBalance(pageId, function (err, wei) {
        if (err) {
            return res.redirect(`/error`)
        }
        let bal = web3.utils.fromWei(wei, 'ether');
        return res.render('address', { address: pageId, bal })
    })
})

module.exports = router;