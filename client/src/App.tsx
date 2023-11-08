import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modern-drawer/dist/index.css";

import RouteWrapper from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { getCookie } from "./utils/cookies";
import { useEffect } from "react";
import { getUser } from "./redux/slices/user";
import { useAppDispatch } from "./hooks/redux";
import "./App.css";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const authCookie = getCookie("Auth");
    if (authCookie) {
      dispatch(getUser());
      console.log("Auth Cookie:", authCookie);
    } else return undefined;
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
