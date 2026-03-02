import express from 'express';
import { getAllQuiz,getAllResults,getQuestion, submitAns, submitQuiz } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';


const userRoute=express.Router();
userRoute.get('/getquiz', authMiddleware,getAllQuiz)
userRoute.get('/getquestion/:quizId',getQuestion);
userRoute.post('/submitAns',authMiddleware,submitAns)
userRoute.post('/submit/quiz',authMiddleware,submitQuiz)
userRoute.get('/getresult',authMiddleware,getAllResults)
export default userRoute