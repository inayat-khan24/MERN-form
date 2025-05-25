// step 1 install mongoose and mongoDB
// step 2 import mongoose
import { mongoose } from "mongoose";

try {
    await mongoose.connect("mongodb://localhost:27017/user_form")
    mongoose.set("debug",true);
} catch (error) {
    console.log(error)
}
const userSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    age : {type:Number,required:true, min:5}
    
},{
    timestamp:true
})

// now create model

const Users = mongoose.model("user",userSchema)


app.post('/api/form', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newForm = new Users({ name, email, age});
    await newForm.save();
    res.status(201).json({ message: 'Form submitted!' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving form data' });
  }
});