const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const bcryptjs = require('bcryptjs');
const removeCourse = require('../config/helper').removeCourse;
const removeCategory = require('../config/helper').removeCategory;
const categoryExists = require('../config/helper').categoryExists;

exports.viewProfileAdmin = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const existingUser= await User.findOne({username: req.user.username});
        if(!existingUser){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            return res.send({ data: existingUser});
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.addAdmin = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const username = req.body.username;
        const password = req.body.password;
        const passwordCheck = req.body.passwordCheck;
        if(!username || !password || !passwordCheck){
            return res.send("Please enter all fields!");
        }
        if(password.length<8){
            return res.send("The password must be at least 8 characters!");  
        }
        if(password!=passwordCheck){
            return res.send("Passwords do not match!")
        }
        const existingUser = await User.findOne({username: username});
        if(existingUser){
            return res.send("This username is already registered!");
        }
        else{
            const salt = await bcryptjs.genSalt(10);
            const passwordHashed = await bcryptjs.hash(password,salt);
            const newUser = new User({
                username:username,
                type:"Admin",
                password:passwordHashed
            });
            await newUser.save();
            return res.send("Admin added successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.disableUser = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const username = req.body.username;
        if(!username){
            return res.send("Please enter all fields!");
        }
        const existingUser = await User.findOne({username: username});
        if(!existingUser){
            return res.send("Username does not exist!");
        }
        else{
            existingUser.disabled = true;
            await existingUser.save();
            return res.send("User disabled successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.viewUsers = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const existingUsers = await User.find({});
        if(!existingUsers){
            return res.send("No users found!");
        }
        else{
            return res.send({users: existingUsers});
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.addCategory = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const categoryName = req.body.categoryName;
        if(!categoryName){
            return res.send("Please enter all fields!");
        }
        const existingCategory= await Category.findOne({categoryName: categoryName});
        if(existingCategory){
            return res.send("Category already exists!");
        }
        else{
            const newCategory = new Category({
                categoryName: categoryName
            });
            await newCategory.save();
            return res.send("Category added successfully!")
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.addCourse = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        const courseDescription = req.body.courseDescription;
        const coursePoints = req.body.coursePoints;
        if(!courseName || !courseDescription || !coursePoints){
            return res.send("Please enter all fields!");
        }
        const existingCourse = await Course.findOne({courseName: courseName});
        if(existingCourse){
            return res.send("Course already exists!");
        }
        else{
            const newCourse = new Course({
                courseName: courseName,
                courseDescription: courseDescription,
                coursePonts: coursePoints
            });
            await newCourse.save();
            return res.send("Course added successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.updateCategory = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const categoryName = req.body.categoryName;
        const newCategoryName = req.body.newCategoryName;
        if(!categoryName){
            return res.send("Please enter all fields!");
        }
        const existingCategory= await Category.findOne({categoryName: categoryName});
        if(!existingCategory){
            return res.send("Category does not exist!");
        }
        else{
            existingCategory.categoryName = newCategoryName;
            await existingCategory.save();
            for (var i = 0; i < existingCategory.categoryCourses.length; i++) {
                const course = await Course.findOne({courseName: existingCategory.categoryCourses[i].courseName});
                removeCategory(course.courseCategory, categoryName);
                course.courseCategory.push(newCategoryName); 
                await course.save();
            }
            return res.send("Category updated successfully!");
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.updateCourse = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        const newCourseName = req.body.newCourseName;
        const newCourseDescription = req.body.newCourseDescription;
        const newCoursePoints = req.body.newCoursePoints;
        if(!courseName || !newCourseName || !newCourseDescription || !newCoursePoints){
            return res.send("Please enter all fields!");
        }
        const existingCourse = await Course.findOne({courseName: courseName});
        if(!existingCourse){
            return res.send("Course does not exist!");
        }
        else{
            existingCourse.courseName = newCourseName;
            existingCourse.courseDescription = newCourseDescription;
            existingCourse.coursePoints = newCoursePoints;
            await existingCourse.save();
            for (var i = 0; i < existingCourse.courseCategory.length; i++) {
                const category = await Category.findOne({categoryName: existingCourse.courseCategory[i].categoryName});
                removeCourse(category.categoryCourses, courseName);
                category.courseCategory.push(newCourseName); 
                await category.save();
            }
            return res.send("Course updated successfully!");
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.deleteCategory = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const categoryName = req.body.categoryName;
        if(!categoryName){
            return res.send("Please enter all fields!");
        }
        const existingCategory= await Category.findOne({categoryName: categoryName});
        if(!existingCategory){
            return res.send("Category does not exist!");
        }
        else{
            for (var i = 0; i < existingCategory.categoryCourses.length; i++) {
                const course = await Course.findOne({courseName: existingCategory.categoryCourses[i].courseName});
                removeCategory(course.courseCategory, categoryName);
                await course.save();
            }
            await Category.deleteOne({categoryName: categoryName});
            return res.send("Category deleted successfully!");
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.deleteCourse = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        if(!courseName){
            return res.send("Please enter all fields!");
        }
        const existingCourse= await Course.findOne({courseName: courseName});
        if(!existingCourse){
            return res.send("Course does not exist!");
        }
        else{
            for (var i = 0; i < existingCourse.courseCategory.length; i++) {
                const category = await Category.findOne({categoryName: existingCourse.courseCategory[i].categoryName});
                removeCourse(category.categoryCourses, courseName);
                await category.save();
            }
            await Course.deleteOne({courseName: courseName});
            return res.send("Course deleted successfully!");
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.addCourseCategoryToCourse = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        const categoryName = req.body.categoryName;
        if(!courseName || !categoryName){
            return res.send("Please enter all fields!");
        }
        const existingCourse = await Course.findOne({courseName: courseName});
        const existingCategory = await Category.findOne({categoryName: categoryName})
        if(!existingCourse || !existingCategory){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            if(categoryExists(existingCourse.courseCategory, categoryName)){
                return res.send("Something went wrong! Please try again.");
            }
            else{
                existingCategory.categoryCourses.add({
                    courseName: courseName
                });
                await existingCategory.save();
                existingCourse.courseCategory.add({
                    categoryName: categoryName
                });
                await existingCourse.save();
                return res.send("Category added successfully!");
            }
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.removeCourseCategoryFromCourse = async(req,res)=>{
    try {
        if(req.user.type !== "Admin"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        const categoryName = req.body.categoryName;

        if(!courseName || !categoryName){
            return res.send("Please enter all fields");
        }
        const existingCourse = await Course.findOne({courseName: courseName});
        const existingCategory = await Category.findOne({categoryName: categoryName})
        if(!existingCourse || !existingCategory){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            if(categoryExists(existingCourse.courseCategory, categoryName)){
                removeCourse(existingCategory.categoryCourses, courseName);
                await existingCategory.save();
                removeCategory(existingCourse.courseCategory, categoryName);
                await existingCourse.save();
                return res.send("Category removed successfully!");
            }
            else{
                return res.send("Something went wrong! Please try again.");
            }
        }
    }
    catch (error){
        res.status(500).json({error:error.message});

    }
}