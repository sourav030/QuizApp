import mongoose from 'mongoose';
import Quiz from '../models/uqizModel.js';
import Question from '../models/quesModel.js'

export async function createQuiz(req, res) {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;
        if (!title || !description) {
            return res.status(403).json({
                success: false,
                message: 'Invalid Quiz Format'
            })
        }
        const quiz = await Quiz.create({
            title,
            description,
            createdBy: userId
        })
        return res.status(200).json({
            success: true,
            message: "Quiz Created Successfully",
            quiz
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "Server Side Error"
        })
    }
}



export async function createQuestion(req, res) {
    try {
        const { question, options, correctAnswer, quizId } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            req.status(400).json({
                success: false,
                message: "Quiz is not Present"
            })
        }
        const userId = req.user._id;
        console.log(userId);



        if (userId.toString() !== quiz.createdBy.toString()) {
            return res.status(406).json({
                success: false,
                message: "You have no access to add a new question"
            });
        }


        await Question.create({
            question,
            options,
            correctAnswer,
            quizId
        })
        return res.status(200).json({
            success: true,
            message: "Question add successFull"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            successs: false,
            message: "Server side error"
        })
    }
}