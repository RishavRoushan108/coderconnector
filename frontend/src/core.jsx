import Body from "./layout/Body";
import Login from "./component/Login";
import Profile from "./component/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./util/appstore";
import { Provider } from "react-redux";
import Signup from "./component/Signup";
import Feed from "./component/Feed";
import Connections from "./component/Connections";
import Request from "./component/Request";
import View from "./component/View";
import Chat from "./component/Chat";
// import { Toaster } from "react-hot-toast";

const Core = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
              <Route path="/view/:id" element={<View />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default Core;
