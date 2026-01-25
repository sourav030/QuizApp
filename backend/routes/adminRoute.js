import express from  'express';
import { createQuiz, createQuestion } from '../controllers/adminController.js';
import { adminMiddleware } from '../middleware/admin.js';


const AdminRouter=express.Router();
AdminRouter.post('/createQuiz',adminMiddleware,createQuiz);
AdminRouter.post('/createQuestion',adminMiddleware,createQuestion);

export default AdminRouter