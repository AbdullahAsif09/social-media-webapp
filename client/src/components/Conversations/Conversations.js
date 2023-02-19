import axios from "axios";
import noAvatar from "../assets/noAvatar.png"
import React, { useContext, useEffect, useState } from "react";
import "./conversation.scss";
import { CreateContext } from "../../context/AuthContext";
function Conversations({ list}) {
  const { user } = useContext(CreateContext);
  const [userData, setuserData] = useState();
  // console.log(list)
  useEffect(() => {
    const fetchUsers = async () => {
      const conversationMember = list.members.find(
        (users) => users !== user._id
      );
      //  console.log(conversationMember);
      //  console.log(user._id);
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/find/${conversationMember}`
        );
        // console.log(res);
        setuserData(res?.data);
       } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [list, user]);

  return (
    <div className="conversation">
      <img
        src={
          userData?.profilePicture
            ? "http://localhost:8800/images/" + userData?.profilePicture
            : noAvatar
        }
        alt="."
      />
      <strong>{userData?.username}</strong>
    </div>
  );
}

export default Conversations;
