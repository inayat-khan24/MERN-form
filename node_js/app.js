import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userModel } from "./mangoose/mangoose.js";

const app = express();
app.use(cors());
app.use(express.json());


// API Route we are giving value form input to mangodb database
app.post('/api/form', async (req, res) => {
  const { name, email, age } = req.body;
  
  try {
    const newUser = new userModel({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: 'Form submitted successfully', email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving form data' });
  }
});

// get method form mangodb
app.get('/api/forms', async(req,res)=>{
try {
  const userData = await userModel.find()
  if (!userData || userData.length === 0){
    return res.status(404).json({massage : "user data not found"})
  }
  res.status(200).json(userData)
  
} catch (error) {
  res.status(500).json({ error: error.message });
}})


// ✅ GET: Get form by ID (with corrections)
app.get("/api/forms/:id",async(req,res)=>{
try {
    const id = req.params.id;
    // we are finding user with id and this method
const userExist = await userModel.findById(id);
  if (!userExist){ return res.status(404).json({message:"User not found."}) }
 res.status(200).json(userExist)
} catch (error) {
 res.status(500).json({ error: error.message }); 
}})


// for deleted deta 
app.delete("/api/forms/:id",async(req,res)=>{
try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if (!userExist){ return res.status(404).json({message:"User not found."}) }
   await userModel.findByIdAndDelete(id);;
 res.status(200).json({massage:"User deleted successfully"})
} catch (error) {
 res.status(500).json({ error: error.message }); 
}})

app.put("/api/updated/forms/:id", async(req,res)=>{
 try {
    const id = req.params.id
    const userExist = await userModel.findById(id);
    if (!userExist){ return res.status(404).json({message:"User not found."}) }
    // we have three perameter for update method first with whose id data we wanna update
    // req.body to updated to the user body 
const UpdatedData = await userModel.findByIdAndUpdate(id,req.body,{
  new:true
})
res.status(200).json(UpdatedData)
    
 } catch (error) {
  res.status(500).json({ error: error.message }); 
 }
})



// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
