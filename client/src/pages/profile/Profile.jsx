import React, { useContext } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../../components/Left-Sidebar/Leftbar";
import "./profile.scss";
import Feeds from "../../components/Feeds/Feeds.js";
import Rightbar from "../../components/Right-Sidebar/Rightbar";
import Pinfo from '../../components/Profile-Info/Pinfo';
import { useParams } from 'react-router-dom';
import Share from '../../components/share/Share';
import { CreateContext } from '../../context/AuthContext';

function Profile() {
  const {user} = useContext(CreateContext)
  const username = useParams().username;
  // console.log(username);
  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile">
        <Leftbar />
        <div className="info-profile">
          <Pinfo username={username} />
          {
            username === user.username &&(
          <Share />
            )
          }
          <Feeds username={username} />
        </div>
        <Rightbar />
      </div>
    </div>
  );
}

export default Profile