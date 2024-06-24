import mongoose from "mongoose";    

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfully connected to mongoDB 😁`);
    } catch (error) {
        console.log(`ERROR: ${error}`)
        process.exit(1);
    }
}
export default connectDB