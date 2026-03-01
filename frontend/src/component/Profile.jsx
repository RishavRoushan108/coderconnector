import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../util/constant";
import axios from "axios";
import toast from "react-hot-toast";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const profile = user?.user || {};
  const [changepasswordview, setchangepasswordview] = useState(false);
  const [currentpassword, setcurrentpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  // console.log(profile);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNo: "",
    age: "",
    gender: "",
    photo: "",
    about: "",
    skills: "",
    nationality: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (!profile) return;

    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      emailId: profile.emailId || "",
      phoneNo: profile.phoneNo || "",
      age: profile.age || "",
      gender: profile.gender || "",
      photo: profile.photo || "",
      about: profile.about || "",
      skills: profile.skills || "",
      nationality: profile.nationality || "",
    });
  }, [profile]);
  const handleeditprofile = async () => {
    try {
      if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.emailId === "" ||
        formData.phoneNo === ""
      ) {
        toast.error("fill all compulary detail");
        return;
      }
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      toast.success("profile change successfully");
    } catch (err) {
      console.log(err);
      toast.error("profile change failed");
    }
  };
  const handlepassword = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/changepassword",
        { currentpassword, newpassword },
        { withCredentials: true },
      );
      toast.success("password changed successfully");
      setchangepasswordview(false);
    } catch (err) {
      console.log(err);
      toast.error("password changed failed");
    }
  };
  return (
    <div className="flex flex-col md:flex-row md:gap-20">
      <div className="text-gray-400 w-[90%] md:w-120 lg:w-200 mx-auto mt-7 py-2 px-2 md:ml-[2%] md:my-auto bg-[#0e1c35] rounded-2xl">
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
              Intrested
            </button>

            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Ignore
            </button>
          </div>
        </div>
      </div>
      <div className="w-full min-h-full flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-[#1b263b] rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="firstName"
              placeholder="First Name*"
              className="input-style"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              name="lastName"
              placeholder="Last Name*"
              className="input-style"
              onChange={handleChange}
              value={formData.lastName}
            />
            <input
              name="emailId"
              type="email"
              placeholder="Email*"
              className="input-style"
              onChange={handleChange}
              value={formData.emailId}
            />
            <div className="relative">
              <input
                type="password"
                value="********"
                className="w-full px-4 py-2 border rounded-lg"
                readOnly
              />
              <span
                onClick={() => setchangepasswordview((x) => !x)}
                className="absolute right-3 top-2 text-sm text-blue-600 cursor-pointer"
              >
                Change
              </span>
              {changepasswordview && (
                <div className="absolute right-0 mt-2 w-72 bg-gray-900 border rounded-lg shadow-lg p-4 z-10">
                  <h4 className="text-sm font-semibold mb-3">
                    Change Password
                  </h4>

                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentpassword}
                    onChange={(e) => setcurrentpassword(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border rounded bg-gray-800"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border rounded bg-gray-800"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setchangepasswordview(false)}
                      className="text-sm px-3 py-1 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlepassword}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            <input
              name="phoneNo"
              placeholder="Phone Number*"
              className="input-style"
              onChange={handleChange}
              value={formData.phoneNo}
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              className="input-style"
              onChange={handleChange}
              value={formData.age}
            />
            <select
              name="gender"
              className="input-style"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              name="nationality"
              placeholder="Nationality"
              className="input-style"
              onChange={handleChange}
              value={formData.nationality}
            />
            <input
              name="photo"
              placeholder="Photo URL"
              className="input-style md:col-span-2"
              onChange={handleChange}
              value={formData.photo}
            />
            <textarea
              name="about"
              placeholder="About You"
              className="input-style md:col-span-2 h-24"
              onChange={handleChange}
              value={formData.about}
            />
            <input
              name="skills"
              placeholder="Skills (comma separated)"
              className="input-style md:col-span-2"
              onChange={handleChange}
              value={formData.skills}
            />
          </div>
          <button
            onClick={handleeditprofile}
            className="w-full mt-8 bg-[#415a77] hover:bg-[#778da9] transition py-3 rounded-xl font-semibold"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
