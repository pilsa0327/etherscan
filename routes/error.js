const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
        return res.render('error')
})

module.exports = router;