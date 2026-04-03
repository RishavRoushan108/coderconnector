import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [connectionlist, setconnectionlist] = useState([]);
  const navigate = useNavigate();
  const dummyMessages = [
    { id: 1, sender: "me", text: "Hey bro 👋" },
    { id: 2, sender: "other", text: "Hello! How are you?" },
    { id: 3, sender: "me", text: "I’m good, working on Coder Connector 😄" },
    { id: 4, sender: "other", text: "Nice! Sounds cool 🔥" },
  ];
  useEffect(() => {
    const Loadconnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connection", {
          withCredentials: true,
        });
        setconnectionlist(res.data.data);
      } catch (err) {
        console.log(err);
        toast.error("something went wrong ");
      }
    };
    Loadconnections();
  }, []);
  return (
    <div className="w-full h-125">
      <div className="w-[95%] border-gray-300 border-2 mx-auto h-full flex">
        <div className="w-[40%] h-full bg-[#1b263b] flex flex-col">
          <div className="p-4 border-b border-gray-600 text-white font-semibold text-lg">
            Connections
          </div>
          <div className="flex-1 overflow-y-auto">
            {connectionlist.length > 0 ? (
              connectionlist.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b border-gray-700 hover:bg-[#243447] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.photo || "https://via.placeholder.com/40"}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-white font-medium">
                        {item.firstName} {item.lastName}
                      </span>
                    </div>
                    <div
                      className="text-gray-300 text-lg"
                      onClick={() => navigate(`/view/${item._id}`)}
                    >
                      →
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="no connections"
                  className="w-20 h-20 mb-4 opacity-70"
                />

                <p className="text-white text-lg font-semibold">
                  No Connections Yet
                </p>

                <p className="text-gray-400 text-sm mt-2">
                  Start connecting with people to chat with them.
                </p>

                <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                  Find Connections
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-[60%] h-full bg-[#223750] flex flex-col">
          <div className="p-4 border-b border-gray-600 text-white font-semibold">
            Chat
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {dummyMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[60%] text-sm ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-600 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-gray-400 p-2 rounded-lg outline-none"
            />
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
