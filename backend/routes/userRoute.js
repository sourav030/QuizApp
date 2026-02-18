import express from 'express';
import { getAllQuiz,getQuestion, submitAns } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';


const userRoute=express.Router();
userRoute.get('/getquiz', getAllQuiz)
userRoute.get('/getquestion/:quizId',getQuestion);
userRoute.post('/submitAns',authMiddleware,submitAns)

export default userRoute