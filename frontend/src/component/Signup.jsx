import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/constant";
import axios from "axios";

import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
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

  const handlesingup = async () => {
    try {
      if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.emailId === "" ||
        formData.password === "" ||
        formData.phoneNo === ""
      ) {
        toast.error("fill all compulary detail");
        return;
      }

      await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      toast.success("signup successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      //main error is that i have to show as toast is err.response.data
    }
  };

  return (
    <div className="w-full min-h-full flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-[#1b263b] rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="firstName"
            placeholder="First Name*"
            className="input-style"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name*"
            className="input-style"
            onChange={handleChange}
          />
          <input
            name="emailId"
            type="email"
            placeholder="Email*"
            className="input-style"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password*"
            className="input-style"
            onChange={handleChange}
          />
          <input
            name="phoneNo"
            placeholder="Phone Number*"
            className="input-style"
            onChange={handleChange}
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="input-style"
            onChange={handleChange}
          />
          <select name="gender" className="input-style" onChange={handleChange}>
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
          />
          <input
            name="photo"
            placeholder="Photo URL"
            className="input-style md:col-span-2"
            onChange={handleChange}
          />
          <textarea
            name="about"
            placeholder="About You"
            className="input-style md:col-span-2 h-24"
            onChange={handleChange}
          />
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            className="input-style md:col-span-2"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handlesingup}
          className="w-full mt-8 bg-[#415a77] hover:bg-[#778da9] transition py-3 rounded-xl font-semibold"
        >
          Sign Up
        </button>
        <p
          className="cursor-pointer text-gray-300 hover:text-amber-100 mt-3"
          onClick={() => navigate("/login")}
        >
          if you have already account? /signin
        </p>
      </div>
    </div>
  );
};

export default Signup;
