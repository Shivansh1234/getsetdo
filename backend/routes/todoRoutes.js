const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// get tasks
router.get('/getTodos', protect, getTodos);

// post task
router.put('/addTodo', protect, addTodo);

// update task
router.put('/updateTodo/:id', updateTodo);

// delete task
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router;
