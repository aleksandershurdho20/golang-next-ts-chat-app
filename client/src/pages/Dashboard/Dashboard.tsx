import { MessageSquare } from "react-feather";

import Courses from "./Courses/Courses";
export default function Dashboard() {
  return (
    <div className="row mx-auto vh-100 ">
      <div className="col-md-3 bg-white h-100 shadow-md">
        <div className="sidebar">
          <div className="links">
            <ul className="list-unstyled py-4 px-4">
              <li className="mb-3">Dashboard</li>
              <li className="mb-3">Courses</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="col-md-9 ps-0 ms-0 me-0 pe-0 "
        style={{ borderRight: "1px solid #E8E8E8" }}
      >
        <div className="bg-white py-3 px-3 ">
          <div className="d-flex justify-content-between">
            <input type="text" className="form-control form-control-sm w-25" />

            <div>
              <MessageSquare />
              <a>icon</a>
            </div>
          </div>
        </div>
        <Courses />
      </div>
    </div>
  );
}
