

import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const db = mongoose.connect(process.env.MONGO_URI!)

export default db