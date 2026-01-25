import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDb } from './config/db.js';
import authRouter from './routes/authRoute.js';
import AdminRouter from './routes/adminRoute.js';
import userRoute from './routes/userRoute.js';

const app=express();
const PORT=3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// DATABASE
connectDb()

// ROUTES
app.get('/',(req,res)=>{
    res.send("helloWorld");
})
app.use('/api/auth', authRouter)
app.use('/api/admin',AdminRouter)
app.use('/api/user',userRoute)

app.listen(PORT,()=>{
    console.log(`app is listen ${PORT}`)
})