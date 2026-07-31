import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";


const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/send/review/" + status + "/" + _id, {}, {
                withCredentials: true
            })
            dispatch(removeRequests(_id))
        } catch (err) {
            err.message
        }
    }

    const getRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received",
                { withCredentials: true },
            )

            dispatch(addRequests(res.data.data))
        } catch (err) {
            err.message
        }
    }
    useEffect(() => {
        getRequest();
    }, [])

    if (!requests) return;
    if (requests.length === 0) return <h1 className="text-center font-bold text-xl my-10">No requests found</h1>


    return (
        <div className=" text-center my-10">
            <h1 className="font-bold text-4xl text-red">Request</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, about } = request.fromuserId;

                return (
                    <div key={_id} className="flex m-4 p-4 rounded-xl w-1/2 bg-gray-900 text-white mx-auto">
                        <div>
                            <img alt="photo" className="w-24 h-24 rounded-full" src={photoUrl} />
                        </div>
                        <div className="text-left mx-6">
                            <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="px-4 py-2 m-2 bg-pink-600 text-white rounded-xl" onClick={() => reviewRequest("accepted", request._id)} >Accept</button>
                        </div>
                    </div>

                )
            })}
        </div>
    );
}



export default Requests;