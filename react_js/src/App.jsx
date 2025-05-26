import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



const App = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: ''
  });

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit,setEdit] = useState(false)
  const [id,setId] = useState("")
 

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  //  =================================
 //   form submit data and put data
// ===================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edit === false ){
 try {
      const res = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        setUser({ name: '', email: '', age: '' });
        fetchData(); // Refresh data after submitting
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
    }else{
  try {
    const res = await fetch(`http://localhost:5000/api/forms/update/${id}`,{
       method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    console.log(res)
    
      if (res.ok) {
        alert("Form updated successfully!");
        setUser({ name: '', email: '', age: '' });
        fetchData(); // Refresh data after submitting
      } else {
        alert("Failed to submit form");
      }
  
  } catch (error) {
    console.error(error)
  }


    }
   
  };

   // =================================
 //   get Data  form server
// ===================================
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/forms");
      const result = await res.json();
       
      setUserData(result);
      setLoading(false)
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

 //  =================================
 //   delete function
// ===================================
    const deleted = async(deleteUser)=>{
 
    try {
      const res = await  fetch(`http://localhost:5000/api/forms/${deleteUser}`,{
      method:"DELETE"
     })
     if (res.status === 200) {
      alert("delete succesful")
      fetchData()
     }else if (res.status === 404 ) {
      
      alert("user not found please try again")
     }
    } catch (error) {
       console.error("Error deleting user:", error);
      
    }
     
    
  }


  //  =================================
 //   edit function
// ===================================
const edited = (i,id)=>{
const editUSer = userData[i]
const editUserID = {
  name : editUSer.name,
  email : editUSer.email,
  age : editUSer.age
}
setUser(editUserID)
setId(id)
setEdit(true)

}
 
  // fetch function
  useEffect(() => {
    fetchData();
  }, []);



  if (loading) return <div> Loading.....</div>


  



  const limitationData = userData.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-100  flex flex-col md:flex-row  items-start justify-between p-6 gap-6">
      
      {/* User List */}
      <div className='bg-blue-300 p-6 w-full max-w-md rounded-xl shadow-md'>
        <h3 className='text-xl font-bold text-center mb-4'>User Submissions</h3>
        <ul>
          {limitationData.map((data, index) => (
            <li key={data.id || index} className='bg-amber-300 mt-2 p-3 rounded flex items-center justify-between'>
             <div>
               <h2><strong>NO.</strong> {index+1}</h2>
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Age:</strong> {data.age}</p>
             </div>
             <div className='flex items-center justify-around gap-2'>
              <button className='text-[1.4rem]' onClick={()=>deleted(data._id)}><MdDeleteForever /></button>
              <button className='text-[1.4rem]' onClick={()=>edited(index,data._id)}><FaEdit /></button>
             </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Contact Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="age" className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={user.age}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-200"
          >
            {  edit === false ?  "submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
