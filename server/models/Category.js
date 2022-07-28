const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Category = new schema({

    categoryName:{
        type: String,
        required: true,
        unique: true
    },
    categoryCourses:{
        type: [{
            courseName:{
                type: String
            }
        }]
    }
});

module.exports = mongoose.model('Category', Category);