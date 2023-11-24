// import { MessageSquare } from "react-feather";
// import Courses from "../Courses/Courses";
// import PrivateRoutes from "../../routes/PrivateRoutes";
// import { Link, Route, Routes } from "react-router-dom";
// import { privateRoutesConfig } from "@/routes/config";

// export default function Dashboard({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <div className="row mx-auto vh-100">
//         <div
//           className="col-md-3 bg-white h-100 shadow-md"
//           style={{ borderRight: "1px solid #E8E8E8" }}
//         >
//           <div className="sidebar">
//             <div className="links">
//               <ul className="list-unstyled py-4 px-4">
//                 <li className="mb-3">
//                   <Link to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li className="mb-3">
//                   <Link to="/courses">Courses</Link>
//                 </li>
//                 <li className="mb-3">
//                   <Link to="/profile">Profile</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-9 ps-0 ms-0 me-0 pe-0 ">
//           <div className="bg-white py-3 px-3 ">
//             <div className="d-flex justify-content-between">
//               <input
//                 type="text"
//                 className="form-control form-control-sm w-25"
//               />
//               <div>
//                 <MessageSquare />
//                 <a>icon</a>
//               </div>
//             </div>
//           </div>

//           {children}
//           {/* {privateRoutesConfig.map((route) => (
//             <Route
//               key={route.path}
//               path={route.path}
//               element={
//                 <PrivateRoutes>
//                   <route.component />
//                 </PrivateRoutes>
//               }
//             />
//           ))} */}
//         </div>
//       </div>
//     </>
//   );
// }

import { SocketSelector } from "@/redux/slices/socket";
import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const s = useSelector(SocketSelector);
  console.log(s, "ss");
  return <div>Dashboard</div>;
}
