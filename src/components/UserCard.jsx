import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;
  const { _id, firstName, lastName, gender, age, about, photoUrl } = user;
const dispatch = useDispatch();
  
  const handleRequests = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true
      })
      dispatch(removeFeed(userId));
    }
    catch (err) {
      console.error("Error handling request:", err.message)
    }
  }
  return (
    <div className="bg-gray-900 w-80 shadow-xl rounded-xl overflow-hidden">
      <div className="px-10 pt-10 flex justify-center">
        <img
          src={photoUrl}
          alt="Profile"
          className="rounded-xl w-40 h-40 object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h2 className="text-xl text-white font-bold">{firstName + " " + lastName}</h2>
        {age && <p className="text-gray-500">{"Age : " + age}</p>}
        {gender && <p className="text-gray-500">{"Gender : " + gender}</p>}
        {about && <p className="text-gray-500">{about}</p>}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleRequests("interested", _id)}

          >
            Interested
          </button>
          <button
            className="px-4 py-2 bg-pink-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleRequests("ignore", _id)}
           
          >
            Ignored
          </button>
        </div>
      </div>
    </div>

  )
}
export default UserCard;