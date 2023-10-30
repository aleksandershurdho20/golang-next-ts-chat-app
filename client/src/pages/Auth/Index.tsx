import "./Auth.css";
import AuthForm from "../../components/Auth/AuthForm";
import { FormEvent, useState } from "react";
import { AuthType } from "../../types/Auth";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "../../utils/cookies";

export default function Auth() {
  const [authState, setAuthState] = useState<string>("login");
  const handleAuthStateChange = (authValue: string) => setAuthState(authValue);
  const [authData, setAuthData] = useState<AuthType>({
    email: "",
    password: "",
  });
  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(authData);
    const isInLoginMode = authState == "login";
    api
      .post(isInLoginMode ? "login" : "signup", authData)
      .then((res) => {
        isInLoginMode && setCookie("Auth", res.data.data);
        toast.success("Success!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Welcome back!</h3>
                  <AuthForm
                    authData={authData}
                    authState={authState}
                    handleAuthStateChange={handleAuthStateChange}
                    handleInputChange={handleInputChange}
                    handleAuthSubmit={handleAuthSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
