import dotenv from 'dotenv';
dotenv.config();
import app from "./src/app.js";
import connectDB from './src/db.js';

connectDB();
const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log('Server on port',PORT);
});