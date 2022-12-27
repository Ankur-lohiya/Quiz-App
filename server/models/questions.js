const mongoose = require('mongoose');
const questionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    correctOptions:{
        type:String,
        required:true,
    },
    options:{
        type:Object,
        required:true
    },
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'exam id'
    }
},{timestamps:true});
const Question=mongoose.model('Question',questionSchema);
module.exports=Question;