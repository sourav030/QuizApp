import mongoose from 'mongoose'

export const connectDb=async()=>{
    try{
        await mongoose.connect('mongodb+srv://souravtiwari139_db_user:bZoGHzGkBzAtFmr5@cluster0.6pclyvc.mongodb.net/?appName=Cluster0/quizApp')
        console.log("Db connect Successfully");
    }
    catch(err){
        console.log("error from databasee");
    }
}