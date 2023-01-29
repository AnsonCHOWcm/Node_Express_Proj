const { json } = require('express');
const express = require('express');
const app = express();
const tasks = require('./route/tasks')

const port = 5000

//middleware
app.use(express.json())
app.use('/api/v1/tasks', tasks)

app.listen(port, () => {
    console.log(`The server is listening on ${port}....`)
})

app.get('/hello', (req,res)=>{
    res.status(200).send('Task Manager App')
})