import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from '../models/Product.model.js';
import router from './routes/product.route.js';



const app=express();
app.use(express.json());

app.use(router)
app.listen(5000,()=>{
    connectDB();
    console.log("Server is running on port 5000");
})