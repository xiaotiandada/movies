const mongoose = require('mongoose')
// 定义了title,poster,rating,introduction,created_at,update_at几个基本信息
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    poster: String,
    rating: String,
    introduction: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        thpe: Date,
        default: Date.now
    }
})
// 导出
const Movie = module.exports = mongoose.model('Movie',movieSchema)