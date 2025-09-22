import mongoose from "mongoose";

export const connectDB = async()=>{
  try {
    mongoose.connection.on('connected',()=>{
      console.log('database connected');
    })
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ticketbooking`)    
  } catch (error) {
    console.log(error)
  }
}