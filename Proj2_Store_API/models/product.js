const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'product name must br provided']
    },
    price : {
        type:Number,
        required: [true, 'Price must be provided']
    },
    featured : {
        type:String,
        default: false
    },
    rating: {
        type:Number,
        default: 4.5,
    },
    creatAt : {
        type:Date,
        default : Date.now()
    },
    company : {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
    },
    },
})

module.exports = mongoose.model('Product', productSchema)