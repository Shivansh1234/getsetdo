const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIError = require('../config/APIError');

// @desc Get todos
// @route GET /api/todos
// @access private
const getTodos = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);

    const filter = { _id: userId };
    const query = await User.findById(filter, { _id: 0, todos: 1 });
    const result = query.todos;
    res.status(200).json(result);
}

// @desc Set todos
// @route POST /api/todos
// @access private
const addTodo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);

    const filter = { _id: userId };
    const update = { $push: { 'todos': req.body } };
    const result = await User.updateOne(filter, update);
    res.status(200).json({ success: true, message: 'New Todo added' });
}

// @desc Update todos
// @route PUT /api/todo/:id
// @access private
const updateTodo = async (req, res, next) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const taskType = req.body.taskType;
    const taskProgress = req.body.taskProgress;

    const todo_id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);


    // Check for if user doesn't exists
    if (!userId) {
        res.status(401);
        next(APIError.notFound('User not found'));
    }

    const filter = { _id: userId, 'todos._id': todo_id };
    const update = {
        $set: {
            'todos.$.taskType': taskType,
            'todos.$.taskName': taskName,
            'todos.$.taskDescription': taskDescription,
            'todos.$.taskProgress': taskProgress
        }
    }
    const result = await User.updateOne(filter, update);

    if (!result) {
        res.status(400);
        throw new Error('Todo not found');
    }

    res.status(200).json(result);
}

// @desc Delete todos
// @route DELETE /api/todos
// @access private
const deleteTodo = async (req, res) => {
    const todo_id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);

    // Check for if user doesn't exists
    if (!userId) {
        res.status(401);
        throw new Error('User not found');
    }

    const filter = { _id: userId };
    const update = {
        $pull: {
            todos: { _id: todo_id }
        }
    }

    const result = await User.updateOne(filter, update);
    res.status(200).json({success: true, message: 'Todo deleted'});
}

function getUserId(token) {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET).id;
    return decodedId;
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };