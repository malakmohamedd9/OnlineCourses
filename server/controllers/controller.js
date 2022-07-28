const bcryptjs = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const tokenKey = require("../config/dev").secretOrKey;
const User = require("../models/User");

exports.register = async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const passwordCheck = req.body.passwordCheck;
        const type = req.body.type;
        if(!username || !password || !passwordCheck || !type){
            return res.send("Please enter all fields!");
        }
        if(password.length<8){
            return res.send("The password must be at least 8 characters!");  
        }
        if( ! (type === "Admin" || type === "User" )){
            return res.send("Something went wrong! Please try again.");  
        }
        if(password!=passwordCheck){
            return res.send("Passwords do not match!")
        }
        const existingUser= await User.findOne({username:username});
        if(existingUser){
            return res.send("This username is already registered!");
        }
        else{
            const salt = await bcryptjs.genSalt(10);
            const passwordHashed = await bcryptjs.hash(password,salt);
            if(type === "Admin"){
                const newUser = new User({
                    username:username,
                    type:"Admin",
                    password:passwordHashed
                });
                await newUser.save();
                return res.send("Registration complete!");
            }
            else{
                if(type === "User"){
                    const newUser = new User({
                        username:username,
                        type:"User",
                        password:passwordHashed
                    });
                    await newUser.save();
                    return res.send("Registration complete!");
                }
            }
        }
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({msg:error.message});
    }
}

exports.login = async (req, res, next)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        if(!username || !password){
            return res.send("Please enter all fields!");
        }
        passport.authenticate("login", async function (err, user, message) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({data: "Enter valid credentials!"});
                return res.send({ error: message.message });
            }
            if(user.disabled){
                return res.send("Username disabled!");
            }
            req.login(user, async function (err) {
              try {
                if (err) {
                    res.send({data: "Enter valid credentials!"});
                    return next(err);
                }
                const payload = await User.findOne({ username });
                const token = jwt.sign(payload.toJSON(), tokenKey, {});
                return res.json({ data: `Bearer ${token}`, data2: payload , token: token});
                } catch (err) {
                    return res.send({err});
                }
            });
        })(req, res, next);
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).json({error:error.message});
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const passwordCheck = req.body.passwordCheck;
        if(!password||!newPassword||!passwordCheck){
            return res.send("Please enter all fields!");
        }
        if(newPassword.length <8){
            return res.send("The password must be at least 8 characters!");
        }
        if(newPassword!=passwordCheck){
            return res.send("Please enter the same password twice!");
        }
        const existingUser= await User.findOne({username: req.user.username});
        if(!existingUser){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            const isMatched=await bcryptjs.compare(password, existingUser.password);
            if(!isMatched){
                return res.send("Incorrect old password!");
            }
            else{
                const salt = await bcryptjs.genSalt(10);
                const passwordHashed = await bcryptjs.hash(newPassword,salt);
                existingUser.password = passwordHashed;
                await existingUser.save();
                return res.send("Password changed successfully!");
            }
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.viewCourses = async(req,res)=>{
    try {
        const courses = Course.find({});
        if(!courses){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            return res.send({data: courses});
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.viewCategories = async(req,res)=>{
    try {
        const categories = Category.find({});
        if(!categories){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            return res.send({data: categories});
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.viewCoursesByCategory = async(req,res)=>{
    try {
        const categoryName = req.body.categoryName;
        if(!categoryName){
            return res.send("Please enter all fields!");
        }
        const category = Category.findOne({categoryName: categoryName});
        if(!category){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            return res.send({data: category.categoryCourses});
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}