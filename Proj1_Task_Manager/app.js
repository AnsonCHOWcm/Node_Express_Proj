const { json } = require('express');
const express = require('express');
const app = express();
const tasks = require('./route/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const non_found = require('./middleware/non-found')
const SyntaxErrorHandler = require('./errorHandle/syntax_error_handler')

const port = process.env.PORT || 5000

//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(non_found)
app.use(SyntaxErrorHandler)


//connecting to the DataBase First, then make the server to listen a port
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error){
        console.log(error)
    }
}

start()

