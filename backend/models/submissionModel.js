import mongoose from 'mongoose';

const sumbitSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: 'Quiz',
        required: true
    }
    ,
    quesId: {
        type: mongoose.Types.ObjectId,
        ref: 'Question',
        required: true
    }
    ,
    submitAns: {
        type: String,
        required: true
    }
    ,
    marks: {
        type: Number,
        required: true
    },
    answerBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})






export default mongoose.model.Submission || mongoose.model('Submission', sumbitSchema);