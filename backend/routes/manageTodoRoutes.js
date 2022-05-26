const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { adminProtect } = require('../middlewares/adminMiddleware');
const { addTodoCategory, getTodoCategory, deleteTodoCategory } = require('../controllers/manageTodoController');

// Add todo Category
router.post('/addTodoCategory', adminProtect, addTodoCategory);

// Get todo Category
router.get('/getTodoCategory', protect, getTodoCategory);

// Delete todo Category
router.delete('/deleteTodoCategory', adminProtect, deleteTodoCategory);

module.exports = router;