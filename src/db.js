import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';

export default async () =>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('DB is Connected')
    } catch (error) {
        console.log(error)
    }
}
