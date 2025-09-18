import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) =>{

   const [firstName,setFirstName] = useState(user.firstName);
   const [lastName,setLastName] = useState(user.lastName);
   const [age,setAge] = useState(user.age);
   const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
   const [gender,setGender] = useState(user.gender);
   const [about,setAbout] = useState(user.about);
   const [toast,setToast]= useState(false);
   const [error,setError] = useState("");
  const dispatch = useDispatch();

   const SaveProfile = async()=>{
    try{
   const res = await axios.patch(BASE_URL+ "/profile/edit",{
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl
   },{withCredentials:true});
   dispatch(addUser(res?.data?.data))
    setToast(true);
    setTimeout(()=>{
       setToast(false);
    },3000)
    }
    catch(err){
    setError(err.response.data);
    }
   }
    return(
       <>
       {toast &&  <div className="flex justify-center">
      <button className="px-4 py-2 m-2 bg-green-600 text-white rounded-xl">Profile Saved Successfully</button>
    </div>}
        <div className='flex justify-between my-10 mx-60'>
          <div className="max-w-sm mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 m-8">
        <div className="p-4">
          <h3 className="text-3xl font-bold text-white text-center">Edit Profile</h3>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">First Name</label>
            <input
              type="text"
              value={firstName}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">Age</label>
            <input
              type="text"
              value={age}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

           <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">Photo</label>
            <input
              type="text"
              value={photoUrl}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          
           <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">Gender</label>
            <input
              type="text"
              value={gender}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

           <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 py-2">About</label>
            <input
              type="text"
              value={about}
              className="mt-1 w-full px-4 py-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="text-red-600 text-center">{error}</div>
         <div className="mt-4 flex gap-2 justify-center">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={SaveProfile}>Save Profile</button>
    </div>
     </div>
     </div>
     <UserCard user={{firstName,lastName,age,gender,photoUrl,about}}/>
        </div>
   </>
    )
}

export default EditProfile;