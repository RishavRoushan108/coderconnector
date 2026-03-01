import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adduser } from "../util/userslice";
import { BASE_URL } from "../util/constant";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signin",
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(adduser(res?.data?.user));
      toast.success("Login successful 🎉");
      navigate("/feed");
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data);
    }
  };

  return (
    <div className="w-full min-h-full flex justify-center items-center bg-[#415a77]">
      <div className="bg-[#1b263b] w-100 p-8 rounded-3xl shadow-xl">
        <h2 className="text-white font-bold text-3xl mb-6 text-center">
          Log in
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={emailId}
            onChange={(e) => setemailId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0d1b2a] text-white outline-none focus:ring-2 focus:ring-[#778da9]"
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0d1b2a] text-white outline-none focus:ring-2 focus:ring-[#778da9]"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#415a77] hover:bg-[#778da9] transition py-2 rounded-lg font-semibold text-white"
          >
            Login
          </button>
          <p
            className="cursor-pointer text-gray-300 hover:text-amber-100"
            onClick={() => navigate("/signup")}
          >
            if you have no account? /signup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
