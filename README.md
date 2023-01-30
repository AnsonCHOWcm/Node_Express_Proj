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

### (1) Create

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

### (2) Read

#### (2.1) Read All Data

```
const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch {
        res.status(500).json({msg : error})
    }
}
```

Note that we can specify the data we find by passing object with special condition ro first argument of ".find"

#### (2.2) Read One Data

```
const getTask = async (req, res) => {
    try{
    const {id:taskID} = req.params
    const task = await Task.findOne({_id: taskID})
    if (!task){
        return res.status(404).json({msg: `Not found task ID : ${taskID}`})
    }

    res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
```

Note that we would encounter two types of non-ideal cases.

First one : It means the id is matching the format but there is no such id

Second one : It means general DB operations error like the syntax of the id provide is wrong

***Since Not Id would still execute the ".find" operation, therefore it would not be catch.

If we want to catch this non-ideal case, we have create another response and return it, 

otherwise it would return two responses which makes the server confuse

### (3) Update

```
const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new: true,
            runValidators: true,
        })
        if (!task){
            return res.status(404).json({msg : `Not found ID : ${taskID}`})
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}
```

Note that we would pass in 3 objects:

(1)Searching Condition

(2)Edit Content

(3)Edit Condition (like new: true => return new data and Specification from Schema)

Note that there are two update-related operation : PUT and POST

PUT : overwrite entire data even though the obejct features are not the same (Edit Condition -> overwrite = true)

POST : only replace mentioned data features (Edit Condition -> overwrite = false)

### (4) Delete

```
const deleteTask = async (req, res) => {
    try{
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return res.status(404).json({msg: `Not found task ID : ${taskID}`})
    }
    res.status(200).json({task})
    } catch(error) {
        res.status(500).json({msg : error})
    }

}
```

Similar to Fine one particular object

