import express from 'express';
import Product from '../models/Product.model.js';

//use express router
const router=express.Router();

//create a product
router.post("/products",async (req,res)=>{
    const product=req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all fields"});
    }
    const newProduct=new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true,message:"Product created successfully",data:newProduct});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});   
    }});

//delete a product
router.delete("/api/products/:id",async (req,res)=>{
    const {id}=req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully"});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
});
//get all products
router.get("/products",async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:true,data:products});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
})
//update a product
router.put("/api/products/:id",async(req,res)=>{
    const {id}=req.params;
    const product=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid product ID"});
    }
    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,message:"Product updated successfully",data:updatedProduct});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
})
export default router;