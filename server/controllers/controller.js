const bcryptjs = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const tokenKey = require("../config/dev").secretOrKey;
const User = require("../models/User");
const List = require('../models/List');
const { taskExists, removeList, removeTask } = require('../config/helper');

exports.register = async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const passwordCheck = req.body.passwordCheck;
        if(!username || !password || !passwordCheck ){
            return res.send("Please enter all fields!");
        }
        if(password.length<8){
            return res.send("The password must be at least 8 characters!");  
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
            const newUser = new User({
                username:username,
                password:passwordHashed
            });
            await newUser.save();
            return res.send("Registration complete!");
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

exports.viewProfile = async(req,res)=>{
    try {
        if(!req.user){
            return res.send("Something went wrong! Please try again.");
        }
        else{
            const existingUser = await User.findOne({username: req.user.username});
            if(! existingUser){
                return res.send("Something went wrong! Please try again.");
            }
            const lists = [];
            if(req.user.lists){
                for(let i=0; i< existingUser.lists.length; i++){
                    let list = await List.findOne({name: existingUser.lists[i].listName});
                    lists.push(list);
                }
            }
            return res.send({data: req.user, lists: lists});
        }
    } 
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.createList = async(req,res)=>{
    try {
        const listName = req.body.listName;
        const type = req.body.type;
        if(!listName || !type){
            return res.send("Please enter all fields!");
        }
        const existingList= await List.findOne({name: listName});
        if(existingList){
            return res.send("List already exists! Try using a different title.");
        }
        else{
            const newList = new List({
                name: listName,
                type: type,
                createdAt: new Date()
            });
            const existingUser = await User.findOne({username: req.user.username});
            existingUser.lists.push({
                listName: listName
            })
            await existingUser.save();
            await newList.save();
            return res.send("List added successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.updateList = async(req,res)=>{
    try {
        const listName = req.body.listName;
        const type = req.body.type;
        if(!listName || !type){
            return res.send("Please enter all fields!");
        }
        const existingList = await List.findOne({name: listName});
        if(!existingList){
            return res.send("List does not exist! Try a different title.");
        }
        else{
            existingList.name = listName;
            existingList.type = type;
            await existingList.save();
            return res.send("List updated successfully!");
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.deleteList = async(req,res)=>{
    try {
        const listName = req.body.listName;
        if(!listName){
            return res.send("Please enter all fields!");
        }
        const existingList = await List.findOne({name: listName});
        if(!existingList){
            return res.send("List does not exist!");
        }
        else{
            const existingUser = await User.findOne({username: req.user.username});
            if(!existingUser){
                return res.send("Something went wrong! Please try again later.");
            }
            removeList(existingUser.lists, listName);
            await existingUser.save();
            await List.deleteOne({name: listName});
            return res.send("List deleted successfully!");
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.addTask = async(req,res)=>{
    try {
        const listName = req.body.listName;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const status = req.body.status;
        if(!listName || !title || !description || ! priority || !startDate || ! endDate || !status){
            return res.send("Please enter all fields!");
        }
        const existingList = await List.findOne({name: listName});
        if(!existingList){
            return res.send("List does not exist! Try using a different title.");
        }
        else{
            if(taskExists(existingList.tasks, title)){
                return res.send("Task already exists! Try using a different title.");
            }
            const newTask = {
                title: title,
                description: description,
                priority: priority,
                startDate: startDate,
                endDate: endDate,
                status: status
            }
            existingList.tasks.push(newTask);
            await existingList.save();
            return res.send("Task added successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.moveTask = async(req,res)=>{
    try {
        const listName = req.body.listName;
        const oldListName = req.body.oldListName;
        const title = req.body.title;

        if(!listName || !title || !oldListName){
            return res.send("Please enter all fields!");
        }
        const existingList = await List.findOne({name: listName});
        const existingOldList = await List.findOne({name: oldListName});
        if(!existingList || !existingOldList){
            return res.send("List does not exist! Try using a different title.");
        }
        else{
            if(!taskExists(existingOldList.tasks, title)){
                return res.send("Task does not exist! Try using a different title.");
            }
            for(let i=0; i<existingOldList.tasks.length; i++){

                if(existingOldList.tasks[i].title === title){
                    existingList.tasks.push(existingOldList.tasks[i]);
                    break;
                }
            }
            await existingList.save();
            removeTask(existingOldList.tasks, title);
            await existingOldList.save();
            return res.send("Task moved successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.deleteTask = async(req,res)=>{
    try {
        const listName = req.body.listName;
        const title = req.body.title;
        if(!listName || !title){
            return res.send("Please enter all fields!");
        }
        const existingList = await List.findOne({name: listName});
        if(!existingList){
            return res.send("List does not exist!");
        }
        else{
            if(!taskExists(existingList.tasks, title)){
                return res.send("Task does not exist! Try using a different title.");
            }
            else{
                removeTask(existingList.tasks, title);
            }
            await existingList.save();
            return res.send("Task deleted successfully!");
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

exports.updateTask = async(req,res)=>{
    try {
        const listName = req.body.listName;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const status = req.body.status;
        const newTitle = req.body.newTitle;
        if(!listName || !title || !description || ! priority || !startDate || ! endDate || !status || !newTitle){
            return res.send("Please enter all fields!");
        }
        const existingList = await List.findOne({name: listName});
        if(!existingList){
            return res.send("List does not exist! Try using a different title.");
        }
        else{
            if(!taskExists(existingList.tasks, title)){
                return res.send("Task does not exist! Try using a different title.");
            }
            const newTask = {
                title: newTitle,
                description: description,
                priority: priority,
                startDate: startDate,
                endDate: endDate,
                status: status
            }
            existingList.tasks.push(newTask);
            removeTask(existingList.tasks, title);
            await existingList.save();
            return res.send("Task updated successfully!")
        }
    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}