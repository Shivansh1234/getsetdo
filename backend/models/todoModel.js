const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        todoName: {
            type: String,
            required: true
        },
        todoType: {
            type: String,
            required: true
        },
        todoProgress: {
            type: String,
            required: true
        },
        todoDescription: {
            type: String,
            required: true
        },
        todoComments: [{
            type: String,
            required: true
        }]
    }, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
module.exports = todoSchema;