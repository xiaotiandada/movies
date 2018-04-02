const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('heelo express')
})

module.exports = router