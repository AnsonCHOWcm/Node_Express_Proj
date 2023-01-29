const { json } = require('express');
const express = require('express');
const app = express();
const tasks = require('./route/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

const port = 5000

//middleware
app.use(express.json())
app.use('/api/v1/tasks', tasks)


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

