import mongoose from 'mongoose'

export const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connect Successfully");
    }
    catch(err){
        console.log("error from databasee");
    }
}