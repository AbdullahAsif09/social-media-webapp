import React, { useContext, useRef } from "react";
import { Button,CircularProgress } from "@mui/material";
import { loginCall } from "../../ApiCalls";
import "./login.scss";
import { CreateContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const {isFetching,dispatch,error} = useContext(CreateContext);
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate(); 
  const handleclick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value },dispatch);
    console.log(email);
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Recipe App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <strong>Don't you have any account</strong>
          <Button variant="contained" color="error" onClick={()=>{
            navigate("/register");
          }} > 
            Signup
          </Button>
        </div>
        <div className="right">
          <h2>Login</h2>
          <form>
            <input
              ref={email}
              type="email"
              required
              placeholder="Enter your email"
            />
            <input
              ref={password}
              type="password"
              required
              placeholder="Enter your password"
            />
            {error && (
              <strong className="errorThrow">"wrong user credentials try to login again"</strong>
            )}
            <Button color="secondary" variant="contained" onClick={handleclick}>
              {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
