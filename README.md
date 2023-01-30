Learning Notes for Project 1 Task Manager

#(1)MongoDB

##(1.1)Install mongoose as a module for interacting with MongoDB

Syntax in CLI : npm install mongoose

##(1.2)Connecting MongoDB
By "Connect your application" Options in Connecting the Database in Mongo Atlas.
You would obtain an url with login infos and save it under file '.env'

***Using file '.env' would allow us to keep all the important information to one file and prevent sharing by file '.gitignore'

***To use infos in '.env', we use module 'dotenv'
First, we import it by syntax : "require('dotenv').config"
Then, we can refer to the particular infos by process.env.VAL_NAME

Finally, we create the function for connecting MongoDB by 
```
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

```

##(1.3)Formating the Collections/Tables in MongoDB

Since MongoaDB is NoSQL, there is no specific format for the data stored.
We can use Schema under mongoose to specify the document format

Syntax Example: 
```
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,completed: Boolean
})

module.exports = mongoose.model('Task', TaskSchema)
```