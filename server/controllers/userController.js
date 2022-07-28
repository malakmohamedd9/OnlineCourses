const User = require("../models/User");
const removeCourse = require('../config/helper').removeCourse;
const courseExists = require('../config/helper').courseExists;

exports.registerCourse = async(req,res)=>{
    try {
        if(req.user.type !== "User"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        if(!courseName){
            return res.send("Please enter all fields!");
        }
        const existingUser= await User.findOne({username: req.user.username});
        if(!existingUser){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            const existingCourse = await Course.findOne({courseName: courseName});
            if(!existingCourse){
                return res.send("Something went wrong! Please try again.");
            }
            else{
                if(courseExists(existingUser.registeredCourses, courseName)){
                    return res.send("Something went wrong! Please try again.");
                }
                else{
                    existingUser.registeredCourses.add({
                        courseName: courseName
                    });
                    await existingUser.save();
                    return res.send("Course registration complete!");
                }
            }
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.removeCourse = async(req,res)=>{
    try {
        if(req.user.type !== "User"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        if(!courseName){
            return res.send("Please enter all fields!");
        }
        const existingUser= await User.findOne({username: req.user.username});
        if(!existingUser){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            const existingCourse = await Course.findOne({courseName: courseName});
            if(!existingCourse){
                return res.send("Something went wrong! Please try again.");
            }
            else{
                if(!courseExists(existingUser.registeredCourses, courseName)){
                    return res.send("Something went wrong! Please try again.");
                }
                else{
                    removeCourse(existingUser.registeredCourses, courseName);
                    await existingUser.save();
                    return res.send("Course removed successfully!");
                }
            }
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.completeCourse = async(req,res)=>{
    try {
        if(req.user.type !== "User"){
            return res.send("Unauthorized");
        }
        const courseName = req.body.courseName;
        if(!courseName){
            return res.send("Please enter all fields!");
        }
        const existingUser= await User.findOne({username: req.user.username});
        if(!existingUser){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            const existingCourse = await Course.findOne({courseName: courseName});
            if(!existingCourse){
                return res.send("Something went wrong! Please try again.");
            }
            else{
                if(!courseExists(existingUser.registeredCourses, courseName)){
                    return res.send("Something went wrong! Please try again.");
                }
                else{
                    existingUser.score += existingCourse.coursePoints;
                    await existingUser.save();
                    return res.send("Course completed successfully!");
                }
            }
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.viewProfileUser = async(req,res)=>{
    try {
        if(req.user.type !== "User"){
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