import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import Navbar from './Navbar'
import axios from 'axios';
import {Outlet, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Login from './login';
 const Body =()=>{
 
const dispatch = useDispatch();
const navigate = useNavigate();

 const fetchUser = async()=>{ 
 try{
   const res = await axios.get(BASE_URL + "/profile/view",{
    withCredentials:true,
   })
   dispatch(addUser(res.data))
  }catch(err){
    const status = err?.response?.status;
    if(status === 400 || status === 401){
      navigate("/login");
    }
  }  
};
useEffect(()=>{
  fetchUser();
},[])

    return(
        <div>
          <Navbar/> 
          <Outlet/>
        </div>
    );
 };
 export default Body;