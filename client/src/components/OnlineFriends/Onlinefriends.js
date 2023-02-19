import axios from "axios";
import noAvatar from "../assets/noAvatar.png"
import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../context/AuthContext";
import "./Onlinefriends.scss";
function Onlinefriends() {
  const { user } = useContext(CreateContext);
  const [Friends, setFriends] = useState([]);
  useEffect(() => {
    const FetchFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/friends/${user._id}`
        );
        // console.log(res);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    }; 
    FetchFriends();
  }, [user]);

  return (
    <>
      {Friends?.map((e) => {
        return (
          <div className="onlineFriends" key={e._id}  >          
            <img src={e.profilePicture || noAvatar} alt="." />
            <strong>{e.username}</strong>          
      </div>
        )
        })}
    </>
  );
}

export default Onlinefriends;
