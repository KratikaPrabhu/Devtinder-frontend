import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";


const Connections = ()=>{
   const connections = useSelector((store)=>store.connections)
   const dispatch = useDispatch();
    const getConnection = async()=>{
          try{
               const res = await axios.get(BASE_URL +  "/user/connections",{withCredentials:true,});
              dispatch(addConnections(res.data.data))
              
          }catch(err){
            err.message
          }
    };
   useEffect(()=>{
    getConnection()
   },[]);


   if(!connections) return;
   if(connections.length === 0) return <h1 className="text-center font-bold text-xl my-10">No Connections found</h1>

   
   return (
    <div className=" text-center my-10">
     <h1 className="font-bold text-4xl text-red">Connections</h1>
     {connections.map((connection)=>{
      const {_id,firstName,lastName,photoUrl,age,gender,about} = connection;
 
   return(
   <div key={_id} className="flex m-4 p-4 rounded-xl w-1/2 bg-gray-900 text-white mx-auto">
    <div>
    <img alt="photo" className="w-24 h-24 rounded-full" src={photoUrl}/>
     </div>
    <div className="text-left mx-6">
    <h1 className="font-bold text-xl">{firstName+" "+lastName}</h1>
   <p>{about}</p>
   {age && gender &&<p>{age + " " + gender}</p>}
    </div>
   </div>

   ) 
  })}
 

     </div>
    );
   
};
export default Connections;