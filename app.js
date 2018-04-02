const express = require('express')
const mongoose = require('mongoose')

const index = require('./router/index')
const movie = require('./router/movie')


mongoose.connect('mongodb://localhost:27017/movie')
const app = express()
// app.use('/',(req, res)=>{
//     res.send('ok')
// })
app.listen(3000,() => {
    console.log('app listening on port 3000')
})


app.use('/',index)
app.use('/api',movie)