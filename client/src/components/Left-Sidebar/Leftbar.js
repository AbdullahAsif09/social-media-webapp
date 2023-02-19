import React, { useContext } from 'react'
import "./leftbar.scss"
import FaceIcon from "@mui/icons-material/Face";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreateContext } from '../../context/AuthContext';
function Leftbar() {
  const {user,dispatch } = useContext(CreateContext)
  let navigate = useNavigate();
  return (
    <Paper elevation={2} className="leftbar">
      <div className="card">
        <strong
          onClick={() => {
            navigate("/");
          }}
        >
          <GridViewOutlinedIcon color="primary" /> Home
        </strong>
        <strong
          onClick={(e) => {
            navigate("/messenger");
          }}
        >
          <ChatOutlinedIcon color="primary" />
          Chat Room
        </strong>
        <strong
          onClick={() => {
            navigate(`/profile/${user?.username}`);
          }}
        >
          <FaceIcon color="primary" />
          Profile
        </strong>
        <strong
          onClick={(e) => {
            navigate("/messenger");
          }}
        >
          <Diversity2Icon
            color="primary"
            onClick={(e) => {
              navigate("/messenger");
            }}
          />{" "}
          Friends
        </strong>
        <strong
          onClick={() => {
            navigate("/login");
            dispatch({ type: "LOGIN_OUT" });
            localStorage.clear();
          }}
        >
          <LogoutIcon color="primary" />
          LogOut
        </strong>
      </div>
    </Paper>
  );
}
export default Leftbar