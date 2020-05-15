const mongoose = require('mongoose');
const {Schema} = mongoose;

const lessonschema = new Schema({
    lessonTitle: {
        type : String,
    },
    Bookedby:{
        type:String
    },
    subject:{
        type:String
    },
    className:{
        type:String
    }
   
})

module.exports = mongoose.model('lesson', lessonschema)