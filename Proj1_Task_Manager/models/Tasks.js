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