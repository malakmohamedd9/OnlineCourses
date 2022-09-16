const mongoose = require("mongoose");
const schema = mongoose.Schema;

const List = new schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true,
        enum: ['TODO', 'IN progress', 'Under review', 'Rework', 'Completed']
    },
    tasks:{
        type: [{
            title:{
                type: String,
                required: true
            },
            description: {
                type: String
            },
            priority:{
                type: String,
                enum: ['High', 'Medium', 'Low'],
                required: true
            },
            startDate:{
                type: Date
            },
            endDate:{
                type: Date
            },
            status:{
                type: String
            }
        }]
    },
    createdAt:{
        type: Date
    }
});

module.exports = mongoose.model('List', List);