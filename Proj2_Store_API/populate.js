require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')
const Product_list = require('./products.json')

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('Success!!!!')
        await Product.deleteMany()
        await Product.create(Product_list)
    }catch(error){
        console.log(error)
    }

}

start()