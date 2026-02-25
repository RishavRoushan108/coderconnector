import React from "react";

const Card = ({ formData }) => {
  return (
    <div>
      <div className="text-gray-400 w-[90%] mx-auto mt-7 py-2 px-2 md:ml-[2%] md:my-auto bg-[#0e1c35] rounded-2xl">
        <img
          src={formData.photo}
          alt="profile"
          className="w-[95%] mx-auto mt-4 rounded-xl object-cover h-60"
        />
        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-200">
            {formData.firstName || "Your"} {formData.lastName || "Name"}
          </h2>
          <div className="flex flex-row gap-10 justify-center">
            <p className="font-semibold text-md mt-2">age: {formData.age}</p>

            <p className="font-semibold text-md mt-2">
              Gender: {formData.gender}
            </p>
          </div>
          <div className="flex flex-row gap-10 justify-center">
            <p className="font-semibold text-md mt-2">
              phoneNo: {formData.phoneNo}
            </p>

            <p className="font-semibold text-md mt-2">
              nationality: {formData.nationality}
            </p>
          </div>
          <p className="font-semibold text-md mt-2">about: {formData.about}</p>
          <p className="font-semibold text-md mt-2">
            skills: {formData.skills}
          </p>
          {/* Accept / Reject Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Accept
            </button>

            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
