import axios from "axios";
import { BASE_URL } from "../util/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../util/appstore";
import { addfeed } from "../util/feedslice";
const Connections = () => {
  const Loadconnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.connectionrecieved);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Loadconnections();
  }, []);
  return <div>Connections</div>;
};

export default Connections;
