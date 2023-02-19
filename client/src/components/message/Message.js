import React, { useContext, useEffect, useState } from "react";
import noAvatar from "../assets/noAvatar.png"
import { CreateContext } from "../../context/AuthContext";
import {format} from "timeago.js"
import "./message.scss";
import axios from "axios";
function Message({ messages, own }) {
  const {user} = useContext(CreateContext)
  const [userInfo, setuserInfo] = useState()
  // console.log(messages);
  // console.log(own);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/find/${messages.sender}`
        );
        // console.log(res);
        setuserInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [messages]);
  return (
    <>
      {own === false ? (
        <div className="message">
          <div className="top">
            <img
              src={
                userInfo?.profilePicture
                  ? "http://localhost:8800/images/" + userInfo?.profilePicture
                  : noAvatar
              }
              alt="."
            />
            <strong>{messages?.text}</strong>
          </div>
          <div className="bottom">
            <strong>{format(messages?.createdAt)}</strong>
          </div>
        </div>
      ) : (
        <div className="message-own">
          <div className="top">
            <img
              src={
                user?.profilePicture
                  ? "http://localhost:8800/images/" + user?.profilePicture
                  : noAvatar
              }
              alt="."
            />
            <strong>{messages?.text}</strong>
          </div>
          <div className="bottom">
            <strong>{format(messages?.createdAt)}</strong>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
