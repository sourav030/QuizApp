import mongoose from 'mongoose';
import Quiz from '../models/uqizModel.js';
import Question from '../models/quesModel.js'

export async function getAllQuiz(req, res) {
    try {

        const allQuiz=await Quiz.find();
        return res.status(200).json({
            success:true,
            message:"This is All Quize",
            allQuiz
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Server Side Error"
        })
    }
}

export async function getQuestion(req,res){
    try{
        const { quizId } = req.params;
        const allQuestion= await Question.find({quizId});
        return res.status(200).json({
            success:true,
            message:"Successfull",
            allQuestion
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Server side error"
        })
    }
}