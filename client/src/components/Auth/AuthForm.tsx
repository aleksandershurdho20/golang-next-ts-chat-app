import React from "react";
import { AuthType } from "../../types/Auth";

type Props = {
  authState: string;
  handleAuthStateChange: (value: string) => void;
  authData: AuthType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthSubmit: (e: React.FormEvent) => void;
};
export default function AuthForm({
  authState,
  handleAuthStateChange,
  handleInputChange,
  authData,
  handleAuthSubmit,
}: Props) {
  const isInLoginMode = authState == "login";
  return (
    <form>
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={authData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={authData.password}
          onChange={handleInputChange}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue=""
          id="rememberPasswordCheck"
        />
        <label className="form-check-label" htmlFor="rememberPasswordCheck">
          Remember password
        </label>
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-dark btn-login text-uppercase fw-bold mb-2"
          onClick={handleAuthSubmit}
        >
          {isInLoginMode ? "Sign in" : "Register"}
        </button>
        <div className="text-center">
          {isInLoginMode && (
            <a className="small me-3" href="#">
              Forgot password?
            </a>
          )}

          <a
            className="small"
            href="#"
            onClick={() =>
              handleAuthStateChange(isInLoginMode ? "register" : "login")
            }
          >
            {isInLoginMode ? "Register" : "Login"}
          </a>
        </div>
      </div>
    </form>
  );
}
