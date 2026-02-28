import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../util/constant";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [user, setuser] = useState({});
  const getdetail = async () => {
    try {
      const data = await axios.get(BASE_URL + "/profile/view/" + id, {
        withCredentials: true,
      });
      setuser(data.data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getdetail();
  }, []);
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden text-2xl font-semibold text-gray-600">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            user.firstName?.[0]
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <div className="flex flex-row gap-2">
            <p className="text-sm text-gray-500 capitalize">{user.gender}</p>
            <p className="text-sm text-gray-500 capitalize">
              {user.nationality}
            </p>
          </div>
        </div>
      </div>
      <div className="my-4 border-t" />
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-medium">Age:</span> {user.age}
        </p>
        <p>
          <span className="font-medium">About:</span>{" "}
          {user?.phoneNo ? user.phoneNo : "not specified"}
        </p>
        <p>
          <span className="font-medium">About:</span>{" "}
          {user?.about ? user.about : "not specified"}
        </p>

        {user.skills && user.skills.length > 0 && (
          <div>
            <p className="font-medium mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
