import { userModel } from "../mangoose/mangoose.js";


// =============================================
//   function of user data insert to mongoDb
// =============================================
export const create =   async (req, res) => {
  const { name, email, age } = req.body;
  
  try {
    const newUser = new userModel({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: 'Form submitted successfully',name:newUser.name, email: newUser.email,age:newUser.age});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving form data' });
  }
}
// =========================================
//   function of get user all data
// =========================================
export const  getAllUser = async(req,res)=>{
try {
  const userData = await userModel.find()
  if (!userData || userData.length === 0){
    return res.status(404).json({massage : "user data not found"})
  }
  res.status(200).json(userData)
  
} catch (error) {
  res.status(500).json({ error: error.message });
}}

// =========================================
//   function of get user with id
// =========================================
export const getUserById = async(req,res)=>{
try {
    const id = req.params.id;
    // we are finding user with id and this method
const userExist = await userModel.findById(id);
  if (!userExist){ return res.status(404).json({message:"User not found."}) }
 res.status(200).json(userExist)
} catch (error) {
 res.status(500).json({ error: error.message }); 
}}

// =========================================
//   function of delete mango data
// =========================================
export const  deleteData = async(req,res)=>{
try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if (!userExist){ return res.status(404).json({message:"User not found."}) }
   await userModel.findByIdAndDelete(id);;
 res.status(200).json({massage:"User deleted successfully"})
} catch (error) {
 res.status(500).json({ error: error.message }); 
}}


// =========================================
//   function of update data of user
// =========================================


export const updateData = async(req,res)=>{
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
}