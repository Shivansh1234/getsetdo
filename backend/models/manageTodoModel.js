const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manageTodoSchema = new Schema(
    {
        todoProgress: [
            {
                name: {
                    type: String,
                    unique: true
                },
                createdBy: {
                    type: String
                }
            }
        ],
        todoCategory: [
            {
                name: {
                    type: String,
                    unique: true
                },
                createdBy: {
                    type: String,
                }
            }
        ]
    }, {
    timestamps: true
});

const ManageTodo = mongoose.model('ManageTodo', manageTodoSchema);
module.exports = ManageTodo;