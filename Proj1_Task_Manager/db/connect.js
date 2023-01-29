const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://anson:1234@nodeexpressproj1.e5q0veo.mongodb.net/TaskManager?retryWrites=true&w=majority'

const connectDB = (url) => {
    mongoose
.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('CONNECTED TO THE DB...'))
.catch((err) => console.log(err))
}

module.exports = connectDB;


