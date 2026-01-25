import mongoose from "mongoose";

const quizSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    }

})

export default mongoose.model.Quiz|| mongoose.model('Quiz', quizSchema)