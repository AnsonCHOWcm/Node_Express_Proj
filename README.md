Learning Notes for Project 1 Task Manager

# (1)MongoDB

## (1.1)Install mongoose as a module for interacting with MongoDB

Syntax in CLI : npm install mongoose

## (1.2)Connecting MongoDB
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

## (1.3)Formating the Collections/Tables in MongoDB

Since MongoaDB is NoSQL, there is no specific format for the data stored.
We can use Schema under mongoose to specify the document format.
Noted that only the input data with the same name under the Schema would be taken.
However, the users are allowed to not pass in all the specified data (different from SQL)
If we need to add some limitations on that, we need to include specification under the Schema

Syntax Example: 
```
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Must provide Task Name"],
        trim: true,
        maxlength: [20, 'name can nor be more than 20 characters'],
    } ,
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Task', TaskSchema)
```

## (1.4) CRUD Operations in MongoDB

### (1)Create

```
const createTask = async (req, res) => {
    try {
    const task = await Task.create(req.body)
    res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }

}
```
We use try-and-catch because we have to tackle the error induced by the inputs not following the specification

