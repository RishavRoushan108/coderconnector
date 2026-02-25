import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/constant";
import { removeuser } from "../util/userslice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = ["/login", "/signup"];
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );
      dispatch(removeuser());
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-[#1b263b] h-20 w-full flex items-center justify-between px-6 relative">
      <p className="text-gray-200 text-3xl font-bold">Coder Connector</p>
      {user != null && (
        <div className="relative">
          <img
            src={user?.user?.photo}
            alt="profile"
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-white"
          />

          {!publicRoutes.includes(location.pathname) && open && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg py-2">
              <p
                onClick={() => navigate("/feed")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Feed
              </p>
              <p
                onClick={() => navigate("/profile")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </p>
              <p
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
