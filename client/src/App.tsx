import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RouteWrapper from "./routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* <CreateCourse/> */}
      <RouteWrapper />
      <Toaster />
    </>
  );
}

export default App;
