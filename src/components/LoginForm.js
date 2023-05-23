import React, { useContext, useRef, useState } from "react";

import { AuthContext } from "../cart-context/AuthContext";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const emailInput = useRef("");
  const passwordInput = useRef("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setIsLoading(false);
  };

  // Resource: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    let url;
    if (isLogin) {
      // login
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
    } else {
      // signup
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
    }

    const processRequest = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setIsLoading(false);
      if (response.ok) {
        // login success
        const data = await response.json();

        authCtx.login(data.idToken, enteredEmail);

        navigate("/store", { replace: true });
      } else {
        // login failure
        const data = await response.json();
        let errorMessage = "Login Failure!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      }
    };

    processRequest();
  };

  return (
    <form
      className="container justify-content-center card py-4 my-3 rounded rounded-5"
      style={{ width: "40vw" }}
      onSubmit={submitHandler}
    >
      <h3 className="mb-4">{isLogin ? "Login" : "Sign Up"}</h3>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-control"
          ref={emailInput}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-control"
          ref={passwordInput}
          required
        />
      </div>
      <div className="d-flex justify-content-between">
        {!isLoading && (
          <button className="btn btn-md btn-success w-25" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        )}
        <button
          type="button"
          className="btn w-50 border border-3"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </div>
      {isLoading && (
        <p className="text-center text-dark fs-4">Please Wait...</p>
      )}
    </form>
  );
};

export default LoginForm;
