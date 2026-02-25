import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constant";
import { adduser } from "../util/userslice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchuser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(adduser(res.data));
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    const publicRoutes = ["/login", "/signup"];

    if (!publicRoutes.includes(location.pathname)) {
      fetchuser();
    }
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-[#415a77]">
      <Navbar />

      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
