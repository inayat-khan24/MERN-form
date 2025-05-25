import React, { useState } from 'react'
import { useEffect } from 'react';

const App = () => {
  const [user,setUser] = useState({
    name :'',
    email : '',
    age : ''
})

const handleChange =(e)=>{
setUser({ ...user, [e.target.name]: e.target.value });

}

// console.log({
//   "name" : user.name,
//   "email" : user.email,
//   "age" : user.age

// })

const handleSubmit = async(e)=>{
e.preventDefault()
try {

  const res = fetch("http://localhost:5000/api/form",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify(user)
  })
  alert("form add successful")
   setUser({name:'',email:'',age:''})
  
} catch (error) {
  console.log(error)
}


}

useEffect(()=>{
const getmethod = async()=> {
try {
  const  res = await fetch("http://localhost:5000/api/forms");
  const result = await res.json()
  console.log(result) 

} catch (error) {
  console.error(error)
}
}
getmethod()
},[])


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Contact Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <label htmlFor="name">Name: </label>
        <input 
        type="text"
         name='name' 
          placeholder='Enter name' 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          value={user.name}
           onChange={handleChange}
          />

        <label htmlFor="email">Email:</label>
        <input type="email"
         name='email'  
         placeholder='Enter email' 
         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
         required 
         value={user.email}
         onChange={handleChange}
         />

        <label htmlFor="age">Age :</label>
        <input type="number"
        name='age' 
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={user.age}
        onChange={handleChange}
        />
        <button className='bg-blue-400 w-full py-2'>Submit</button>

      </form>

        </div>
    </div>
  )
}

export default App

 