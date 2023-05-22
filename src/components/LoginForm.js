import React, { useContext, useRef, useState } from "react";

import { AuthContext } from "../cart-context/AuthContext";
import { useNavigate } from "react-router";

const API_KEY = "AIzaSyAtJy-XuxWDX8bz7tFXCJo5lcLWQxDqLuw";

const LoginForm = () => {
  const emailInput = useRef("");
  const passwordInput = useRef("");

  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    const processRequest = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsLoading(false);
      if (response.ok) {
        // login success
        const data = await response.json();
        console.log("login/signup successful");
        console.log("JWT token : " + data.idToken);
        authCtx.login(data.idToken);
        console.log(data);

        navigate("/store");
      } else {
        // login failure
        const data = await response.json();
        let errorMessage = "Login Failure!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
        console.log("login failed: ");
        console.log(data);
      }
    };

    processRequest();
  };

  return (
    <form
      className="container w-50 justify-content-center card py-4 my-3 rounded rounded-5"
      onSubmit={submitHandler}
    >
      <h3 className="mb-4">Login</h3>
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
      {!isLoading && (
        <button className="btn btn-md btn-success w-25" type="submit">
          Login
        </button>
      )}
      {isLoading && (
        <p className="text-center text-dark fs-4">Please Wait...</p>
      )}
    </form>
  );
};

export default LoginForm;
