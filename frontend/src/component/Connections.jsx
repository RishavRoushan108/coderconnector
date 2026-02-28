import axios from "axios";
import { BASE_URL } from "../util/constant";
import { useEffect, useState } from "react";
const Connections = () => {
  const [connectionlist, setconnectionlist] = useState([]);
  const Loadconnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      setconnectionlist(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Loadconnections();
  }, []);
  return (
    <div className="w-full self-start p-4">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-100">
        Connections
      </h1>
      {connectionlist.length != 0 ? (
        <div className="flex flex-col gap-4">
          {connectionlist.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4
                       rounded-xl border border-gray-200 bg-[#2e4158] p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={item.photo}
                      alt={`${item.firstName} profile`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-200">
                      {item.firstName} {item.lastName}
                    </h2>

                    <div className="mt-1 text-sm text-gray-400">
                      <span>Age: {item.age}</span>
                      <span className="ml-4">Gender: {item.gender}</span>
                    </div>

                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {item.about}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:mr-[2%]">
                  <button className="rounded-lg bg-gray-200 border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
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
            New users will appear here as someone accept your request or you
            accept someone request.
          </p>
        </div>
      )}
    </div>
  );
};

export default Connections;
