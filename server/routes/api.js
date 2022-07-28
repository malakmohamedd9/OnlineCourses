const express = require("express");
const router = express.Router();
const { authenticate } = require('../config/authenticate');
const controller = require("../controllers/controller");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

//----------------------------------------------------------------------------------------------------Routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/resetPassword', authenticate, controller.resetPassword);
router.get('/viewCourses', controller.viewCourses);
router.get('/viewCategories', controller.viewCategories);
router.get('/viewCoursesByCategory', controller.viewCoursesByCategory);

//----------------------------------------------------------------------------------------------------User Routes
router.post('/registerCourse', authenticate, userController.registerCourse);
router.post('/removeCourse', authenticate, userController.removeCourse);
router.post('/completeCourse', authenticate, userController.completeCourse);
router.get('/viewProfileUser', authenticate, userController.viewProfileUser);

//----------------------------------------------------------------------------------------------------Admin Routes
router.post('/addAdmin', authenticate, adminController.addAdmin);
router.get('/viewUsers', authenticate, adminController.viewUsers);
router.get('/viewProfileAdmin', authenticate, adminController.viewProfileAdmin);
router.post('/disableUsers', authenticate, adminController.disableUser);
router.post('/addCategory', authenticate, adminController.addCategory);
router.post('/addCourse', authenticate, adminController.addCourse);
router.post('/updateCategory', authenticate, adminController.updateCategory);
router.post('/updateCourse', authenticate, adminController.updateCourse);
router.post('/deleteCategory', authenticate, adminController.deleteCategory);
router.post('/deleteCourse', authenticate, adminController.deleteCourse);
router.post('/addCourseCategoryToCourse', authenticate, adminController.addCourseCategoryToCourse);
router.post('/removeCourseCategoryFromCourse', authenticate, adminController.removeCourseCategoryFromCourse);

//----------------------------------------------------------------------------------------------------Export Router
module.exports = router;