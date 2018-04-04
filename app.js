const express = require('express')

const index = require('./router/index')
const movie = require('./router/movie')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movie');
const app = express()

app.use('/',index)
app.use('/api',movie)

app.use(express.static('dist'))

// app.use('/',(req, res)=>{
//     res.send('ok')
// })
app.listen(3000,() => {
    console.log('app listening on port 3000')
})


