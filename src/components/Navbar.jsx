import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = async()=>{
  try{
    await axios.post(BASE_URL + "/logout",{}, {
        withCredentials:true,
      })
      dispatch(removeUser())
      navigate("/login")
  }
  catch(err){
console.log(err);

  }
 }


  const user = useSelector((store) => store.user)

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex space-x-6">🙍‍♀️DevTinder </Link>
      {user && <div className="flex items-center space-x-2">
        <p>Welcome!!  {user.firstName}</p>
        <div className="relative group">
          <img src={user.photoUrl}
            alt="uset photo"
            className="w-12 h-12 rounded-full"
          />
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <ul className="py-1">
              <li>
                <Link to="/profile" className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/Connections" className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
                 Connections
                </Link>
              </li>
              <li>
                <Link to="/Requests" className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
                 Requests
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 transition-colors">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>}

    </nav>
  );
};

export default Navbar;
