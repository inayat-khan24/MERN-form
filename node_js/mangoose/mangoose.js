import mongoose from "mongoose"
// step 1 connect with mongodb
try {
    await mongoose.connect("mongodb://localhost:27017/user_form")
    mongoose.set({"debug":true})
    
} catch (error) {
    console.log(error)
    mongoose.exit()
}

// step 2 make schema

const userSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    age : {type:Number,required:true,min:5}
},{
    timestamp : true
})

// step 3 make model

export const userModel = mongoose.model("user",userSchema)

