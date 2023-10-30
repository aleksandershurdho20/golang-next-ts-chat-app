import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modern-drawer/dist/index.css";

import RouteWrapper from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { getCookie } from "./utils/cookies";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const authCookie = getCookie("Auth");
    if (authCookie) {
      console.log("Auth Cookie:", authCookie);
    }
  }, []);

  return (
    <>
      {/* <CreateCourse/> */}
      <RouteWrapper />
      <Toaster />
    </>
  );
}

export default App;
