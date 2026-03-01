import axios from "axios";
import { BASE_URL } from "../util/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequest, removerequest } from "../util/requestslice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Request = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connectionrequestlist = useSelector((store) => store.request);
  const handlereview = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removerequest(_id));
      toast.success("request " + status + " successfully");
    } catch (err) {
      console.log(err);
      toast.error("request " + status + " failed");
    }
  };
  const LoadRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addrequest(res.data.connectionrecieved));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    LoadRequest();
  }, []);
  return (
    <div className="w-full self-start p-4">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-100">
        Requests
      </h1>
      {connectionrequestlist && connectionrequestlist.length > 0 ? (
        <div className="flex flex-col gap-4">
          {connectionrequestlist.map((item) => {
            const user = item.fromuserId;

            return (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4
                       rounded-xl border border-gray-200 bg-[#2e4158] p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={user.photo}
                      alt={`${user.firstName} profile`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-200">
                      {user.firstName} {user.lastName}
                    </h2>

                    <div className="mt-1 text-sm text-gray-400">
                      <span>Age: {user.age}</span>
                      <span className="ml-4">Gender: {user.gender}</span>
                    </div>

                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {user.about}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:mr-[2%]">
                  <button
                    onClick={() => handlereview("accepted", item._id)}
                    className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handlereview("rejected", item._id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => navigate(`/view/${user._id}`)}
                    className="rounded-lg bg-gray-200 border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-32 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            You’re all caught up
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            New users will appear here as they send request.
          </p>
        </div>
      )}
    </div>
  );
};

export default Request;
