const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectschema = new Schema({
    class: {
        type: String,
        default: "primary",
        classes: [
            "primary",
            "jss",
            "sss",
        ]
    },
    subjectName:{
        type:String,
    },
    tutor: {
        type: String,
    },
    lessonName: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lesson"
        }
    ]


});

module.exports = mongoose.model('subject', subjectschema)