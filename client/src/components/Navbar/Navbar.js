import React, { useContext, useEffect, useState } from "react";
import { Paper } from "@mui/material";
import "./navbar.scss";
import noAvatar from "../assets/noAvatar.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { CreateContext } from "../../context/AuthContext";
import axios from "axios";
function Navbar() {
  const { user, dispatch, darkmode } = useContext(CreateContext);
  const [DarkMode, setdarkMode] = useState(darkmode);
  const [Name, setName] = useState();
  useEffect(() => {
    const DataFetch = async () => {
      const res = await axios(
        `http://localhost:8800/api/users/find/${user._id}`
      );
      // console.log(res.data);
      setName(res.data);
    };
    DataFetch();
  }, [user]);
  useEffect(() => {
    dispatch({ type: "DARK_MODE", payload: DarkMode });
    // console.log(`${DarkMode} DarkMode`);
  }, [DarkMode]);
  // console.log(user);
  let navigate = useNavigate();
  return (
    <Paper elevation={2} className="navbar">
      <div className="left">
        <h2
          onClick={() => {
            navigate(`/`);
          }}
        >
          Recipe App
        </h2>
      </div>
      <div className="center">
        {/* <div className="searchbar"> */}
          {/* <SearchOutlinedIcon />
          <input placeholder="Search" /> */}
        {/* </div> */}
      </div>
      <div className="right">
        {DarkMode === false ? (
          <DarkModeOutlinedIcon
            color="primary"
            onClick={(e) => {
              setdarkMode(!DarkMode);
              // console.log(`${DarkMode} primary`)
              // dispatch({ type: "DARK_MODE", payload: DarkMode });
            }}
          />
        ) : (
          <LightModeOutlinedIcon
            color="error"
            onClick={(e) => {
              setdarkMode(!DarkMode);
              // console.log(`${DarkMode} eror`);
              // dispatch({ type: "DARK_MODE", payload: DarkMode });
            }}
          />
        )}

        <EmailOutlinedIcon
          color="primary"
          onClick={() => {
            navigate("/messenger");
          }}
        />
        <LogoutIcon
          color="primary"
          onClick={() => {
            navigate("/login");
            dispatch({ type: "LOGIN_OUT" });
            localStorage.clear();
          }}
        />
        <img
          src={
            Name?.profilePicture
              ? "http://localhost:8800/images/" + Name?.profilePicture
              : noAvatar
          }
          alt="..."
          onClick={() => {
            navigate(`/profile/${user?.username}`);
          }}
        />
      </div>
    </Paper>
  );
}

export default Navbar;
