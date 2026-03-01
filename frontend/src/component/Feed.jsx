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
      const result = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      let feedlist = result?.data?.user;
      dispatch(addfeed(feedlist));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getfeed();
  }, []);
  return (
    <div className="w-[90%] flex justify-center items-center">
      {feed != null && feed.length != 0 ? (
        <div className="w-[60%] mx-auto flex justify-center items-center">
          <Card formData={feed[0]} />
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-centertext-center">
            <h2 className="text-3xl font-bold text-gray-900">No posts yet</h2>
            <p className="mt-2 text-sm text-gray-300">
              Your feed is currently empty. You’ve viewed all available users.
              New profiles will appear here as they join
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
