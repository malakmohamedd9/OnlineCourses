const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Course = new schema({

    courseName:{
        type: String,
        required: true,
        unique: true
    },
    courseCategory:{
        type: [{
            categoryName:{
                type: String
            }
        }]
    },
    courseDescription:{
        type: String,
        required: true
    },
    coursePoints:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Course', Course);