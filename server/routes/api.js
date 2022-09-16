const express = require("express");
const router = express.Router();
const { authenticate } = require('../config/authenticate');
const controller = require("../controllers/controller");

//----------------------------------------------------------------------------------------------------Routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/resetPassword', authenticate, controller.resetPassword);
router.get('/viewProfile', authenticate, controller.viewProfile);
router.post('/createList', authenticate, controller.createList);
router.post('/deleteList', authenticate, controller.deleteList);
router.post('/updateList', authenticate, controller.updateList);
router.post('/addTask', authenticate, controller.addTask);
router.post('/moveTask', authenticate, controller.moveTask);
router.post('/deleteTask', authenticate, controller.deleteTask);
router.post('/updateTask', authenticate, controller.updateTask);

//----------------------------------------------------------------------------------------------------Export Router
module.exports = router;