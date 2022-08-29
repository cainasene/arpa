const mongoose = require('mongoose')

const childSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    img : {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required : true,
        default : Date.now()
    }

})

module.exports = function() {

    const schema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        datetime: {
            type: Date,
            required: true,
            default: Date.now()
        },
        deadline: {
            type: Date,
            required: false,

        },
        passos : [childSchema],
        user :{
            type : mongoose.ObjectId,
            required:true,
            ref: 'User'
        }

    })
    return mongoose.model('Assignment', schema, 'assignments')
}