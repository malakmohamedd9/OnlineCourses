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
    lists:{
        type: [{
            listName:{
                type: String
            }
        }]
    }
});

module.exports = mongoose.model('User', User);