import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const Chat = () => {
  const [connectionlist, setconnectionlist] = useState([]);
  const [text, settext] = useState("");
  const [Message, setMessages] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const sendMessage = () => {
    if (!text) return;

    const msgData = {
      senderId: user?.user?._id,
      receiverId: selectedUser?._id,
      message: text,
    };

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);

    settext("");
  };

  useEffect(() => {
    const handleMessage = (data) => {
      if (
        selectedUser &&
        (data.senderId === selectedUser._id ||
          data.receiverId === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [selectedUser]);

  useEffect(() => {
    if (user?.user?._id) {
      socket.emit("register", user?.user?._id);
    }
  }, [user]);

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
  useEffect(() => {
    if (!selectedUser) {
      return;
    }
    const loadmessage = async () => {
      try {
        const messagelist = await axios.get(
          BASE_URL + "/chat/data/" + selectedUser._id,
          {
            withCredentials: true,
          },
        );
        setMessages(messagelist.data);
      } catch (err) {
        console.log(err);
        toast.error("something went wrong ");
      }
    };
    loadmessage();
  }, [selectedUser]);
  return (
    <div className="w-full h-125">
      <div className="w-[95%] border-gray-300 border-2 mx-auto h-full flex">
        <div className="w-[40%] h-full bg-[#1b263b] flex flex-col">
          <div className="p-4 border-b border-gray-600 text-white font-semibold text-lg">
            Connections
          </div>
          <div className="flex-1 overflow-y-auto">
            {connectionlist.length > 0 ? (
              connectionlist.map((item) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => {
                      setselectedUser(item);
                    }}
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
          {!selectedUser ? (
            <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50">
              {/* Icon */}
              <div className="bg-blue-100 p-6 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h2 className="text-xl font-semibold text-gray-700">
                No Chat Selected
              </h2>

              {/* Subtext */}
              <p className="text-gray-500 mt-2 max-w-xs">
                Choose a conversation from the left to start chatting and
                connect instantly.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {Message.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.senderId === user?.user?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[60%] text-sm ${
                        msg.senderId === user?.user?._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-600 flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => settext(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 text-gray-400 p-2 rounded-lg outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
