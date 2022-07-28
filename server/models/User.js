const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({

    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        default:"12345678",
        jsonSchema:{minLength:8}
    },
    type:{
        type: String,
        required:true,
        enum: ["Admin", "User"]
    },
    score:{
        type: Number
    },
    disabled:{
        type: Boolean,
        default: false
    },
    registeredCourses:{
        type: [{
            courseName:{
                type: String,
            },
            completed:{
                type: Boolean,
                default: false
            }
        }]
    }
});

module.exports = mongoose.model('User', User);