import Core from "./core";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Core />
      </div>
    </>
  );
}

export default App;
