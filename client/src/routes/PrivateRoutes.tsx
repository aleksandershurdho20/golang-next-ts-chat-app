import { getCookie } from "@/utils/cookies";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const isAuthenticated = getCookie("Auth");

  if (!isAuthenticated) return <Navigate replace to="/" />;
  else {
    return children;
  }
}
