import { Paper } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import noAvatar from "../assets/noAvatar.png";
import { useState } from "react";
import "./rightbar.scss";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../../context/AuthContext";
function Rightbar() {
  const { user } = useContext(CreateContext);
  let navigate = useNavigate();
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get("http://localhost:8800/api/users/getall");

          setUsers(users?.data);
        // console.log(users.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper elevation={2} className="rightbar">
      <h2>Other Users </h2>
      {Users.map((e) => {
        return (
          <div
            className="card"
            key={e._id}
            onClick={(g) => {
              navigate(`/profile/${e.username}`);
            }}
          >
            <img
              src={
                e.profilePicture
                  ? "http://localhost:8800/images/" + e?.profilePicture
                  : noAvatar
              }
              alt="loading..."
            />
            <strong>{e?.username}</strong>
          </div>
        );
      })}
    </Paper>
  );
}

export default Rightbar;
