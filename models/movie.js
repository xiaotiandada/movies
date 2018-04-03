const mongoose = require('mongoose')
const movieSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image: String,
    rating: String,
    introduction: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    update_at:{
        type: Date,
        default: Date.now()
    }
})

// const Moviev = new Movie({ 
//     title: '12344',
//     image: 'imgs',
//     rating:'ratings',
//     introduction: 'introductions' 
// })
// Moviev.save().then(() => console.log('meow'))

module.exports =  mongoose.model('Movie',movieSchema)