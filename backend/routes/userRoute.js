import express from 'express';
import { getAllQuiz,getQuestion } from '../controllers/userController.js';


const userRoute=express.Router();
userRoute.get('/getquiz', getAllQuiz)
userRoute.get('/getquestion/:quizId',getQuestion);

export default userRoute