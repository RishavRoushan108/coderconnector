import axios from "axios";
import Card from "../smallcomponent/Card";
import { BASE_URL } from "../util/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../util/appstore";
import { addfeed } from "../util/feedslice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getfeed = async () => {
    try {
      if (feed) {
        return;
      }
      const result = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      let feedlist = result?.data?.user;
      dispatch(addfeed(feedlist));
      console.log(feedlist[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getfeed();
  }, []);
  return (
    <div>
      {feed != null && feed.length != 0 ? (
        <Card formData={feed[0]} />
      ) : (
        <h1>no feed</h1>
      )}
    </div>
  );
};

export default Feed;
