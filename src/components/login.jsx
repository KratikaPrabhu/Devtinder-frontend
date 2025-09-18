import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {useNavigate } from "react-router-dom"
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setisLoginform] = useState(true);
  const [error,setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    try {
      const res = await axios.post("https://devtinder-7-63h9.onrender.com/login", {
        email,
        Password
      }, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      navigate("/")
    } catch (err) {
     setError(err?.response?.data || "Login failed")
      
    }
  }

  const handleSignUp = async() =>{
    try{
      const res = await axios.post(BASE_URL+"/signup", {
        firstName,
        lastName,
        email,
        Password
      }, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/profile")
    }catch(err){
      setError(err?.response?.data || "Signup failed")
    }
  }

  return (
    <>
    
      <div className="max-w-sm mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 m-8">
        <div className="p-4">
          <h3 className="text-3xl font-bold text-white text-center">{isLoginForm ? "Login":"SignUp"}</h3>

        { !isLoginForm && (
          <><div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">First Name</label>
            <input
              value={firstName}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">Last Name</label>
            <input
              value={lastName}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          </>
        ) }
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
             
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 py-2">Password</label>
            <input
              type="password"
              id="password"
              value={Password}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
             
            />
          </div>
        <div className="text-red-600 text-center">{error}</div>
          
          <div className="py-4 flex justify-center">
            <button
              className="w-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 text-xl font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={isLoginForm ? handleLogin : handleSignUp}>
          {isLoginForm ? "Login" :"SignUp"}
            </button>
          </div>
            <p className='text-white flex justify-center cursor-pointer' onClick={()=>setisLoginform((value)=>!value)}>{isLoginForm ? "New User : SignUp here" :"Existing User : Login here"}</p>
        </div>
      </div>
    </>
  )
}
export default Login;