import mongoose from "mongoose";

const connectDb = async()=>{
  try {
    mongoose.connection.on('connected',() => console.log('Database connected'))
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/movietickets`)
  } catch (error) {
    console.log(error);
  }
}

export default connectDb