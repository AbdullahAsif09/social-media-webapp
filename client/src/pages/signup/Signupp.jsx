import { Button } from "@mui/material";
import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
function Signupp() {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  let navigate = useNavigate() 
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(username.current.value);
    const fetchData = async () => {
      if (password.current.value === confirmPassword.current.value) {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        setError(false);
        try {
          
          const res = await axios.post(
            "http://localhost:8800/api/auth/register",
            user
          );
          // console.log(res);
          setMessage(false);
          navigate("/")
        } catch (error) {
          // console.log(error);
          error.response?.data && setMessage(true);
        }
      } else {
        setError(true);
      }
    };
    fetchData();
  };
  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>Signup</h2>
          <form>
            <input
              type="text"
              required
              ref={username}
              placeholder="Enter your user name"
            />
            <input
              type="email"
              required
              ref={email}
              placeholder="Enter your user email"
            />
            <input
              type="password"
              required
              ref={password}
              placeholder="Enter your user password"
            />
            <input
              type="password"
              required
              ref={confirmPassword}
              placeholder="Enter your user confirm passoword"
            />
            {message === true && (
              <strong className="errorThrow">invalid input or User already exists</strong>
            )}
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Signup
            </Button>
          </form>
        </div>
        <div className="right">
          <h1>Recipe App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <strong>Do you have account ?</strong>
          <Button variant="contained" color="primary" onClick={()=>{
            navigate("/login");            
          }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signupp;
