import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "../../context/AuthContext";
import Post from "../Post/Post";
import "./feeds.scss";
function Feeds({ username }) {
  const [profilePost, setprofilePost] = useState([]);
  const [feedPost, setfeedPost] = useState([]);
   const feedPostRef = useRef([]);
  const { user } = useContext(CreateContext);
  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const res = await axios(
            `http://localhost:8800/api/posts/profile/${username}`
          );
          //  console.log(res.data);
          setprofilePost(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios(
            `http://localhost:8800/api/posts/timeline/${user._id}`
          );
          console.log(res.data);
          let array = res?.data?.filter((e) => {
            return e.length !== 0;
          });
          setfeedPost(array)
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [username,user]);
  return (
    <div className="feeds">
      {profilePost &&
        profilePost?.map((post) => {
          return <Post key={post._id} dataPost={post} />;
        })}

      {feedPost &&
        feedPost.map((posts) => {
          return posts.map((post)=>{
          console.log(post)
          return <Post key={post._id} dataPost={post} />;
          })

        })}
    </div>
  );
}

export default Feeds;
