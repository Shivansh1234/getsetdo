const jwt = require('jsonwebtoken');
const ManageTodo = require('../models/manageTodoModel');
const User = require('../models/userModel');
const APIError = require('../config/APIError');

// get Todo Categories
const getTodoCategory = async (req, res, next) => {
    const query = await ManageTodo.find({}).select('todoCategory');
    const result = query[0].todoCategory;
    res.status(200).json(result);
}


// add Todo Category
const addTodoCategory = async (req, res, next) => {
    try {

        const todoCategory = req.body.todoCategory;
        const token = req.headers.authorization.split(' ')[1];
        const userId = getEmailId(token);

        const filter = { 'todoCategory.name': { $regex: todoCategory, $options: "i" } };
        const checkIfExists = await ManageTodo.find(filter);

        if (checkIfExists.length === 0) {

            // In order to get user data
            const user = await User.findById(userId).select('email');

            const insertData = {
                name: todoCategory,
                createdBy: user.email
            }

            const update = { $push: { 'todoCategory': insertData } };
            const result = await ManageTodo.updateOne({}, update, { upsert: true });

            res.status(200).json({ success: true, message: 'Todo category added' });

        } else {
            next(APIError.conflict('Todo Category already exists'));
        }

    } catch (err) {
        next(APIError.internal('Internal Server Error'))
    }

}


const deleteTodoCategory = async (req, res, next) => {
    try {
        const todoCategory = req.query.name;
        const update = {
            $pull: {
                todoCategory: { name: todoCategory }
            }
        }
        const result = await ManageTodo.updateOne({}, update);

        res.status(200).json({ success: true, message: 'Todo Category deleted' });
    } catch (err) {
        next(APIError.badRequest('Some error occured'));
    }
}


function getEmailId(token) {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET).id;
    return decodedId;
}

module.exports = { addTodoCategory, getTodoCategory, deleteTodoCategory };