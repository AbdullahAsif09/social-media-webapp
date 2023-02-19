import React, { useContext, useEffect, useState } from "react";
import "./post.scss";
import FavoriterBorderedIcon from "@mui/icons-material/FavoriteBorder";
import { Paper } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import noAvatar from "../assets/noAvatar.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../../context/AuthContext";
import {format} from "timeago.js"
function Post({ dataPost }) {
  let navigate = useNavigate();
  const { user } = useContext(CreateContext);
  // console.log(dataPost); 
  const [Name, setName] = useState("");
  const [like, setlike] = useState(false);
  const [postlike, setpostlike] = useState(dataPost.likes.length);

  useEffect(() => {
    setlike(dataPost.likes.includes(user._id));
  }, [user._id, dataPost.likes]);

  useEffect(() => {
    const DataFetch = async () => {
      const res = await axios(
        `http://localhost:8800/api/users/find/${dataPost.userId}`
      );
      // console.log(res.data);
      setName(res.data);
    };
    DataFetch();
  }, [dataPost]);
  const handleDelete = (e) => {
    e.preventDefault();
    // console.log("delete me please");
    const deleteData = async () => {
      try {
        await axios.delete(`http://localhost:8800/api/posts/${dataPost._id}`);
        window.location.reload();
        // console.log(res);
      } catch (error) {
        // console.log(error);
      }
    };
    deleteData();
  };

  const handleLikes = async (e) => {
    e.preventDefault();
    // console.log("liked");
    try {
      const res = await axios.put(
        `http://localhost:8800/api/posts/${dataPost._id}/like`,
        { userId: user._id }
      );
      // console.log(res);
      setlike(!like);
      setpostlike(like ? postlike - 1 : postlike + 1);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Paper elevation={12} className="post">
      <div className="info">
        <img
          src={
            Name.profilePicture
              ? "http://localhost:8800/images/" + Name?.profilePicture
              : noAvatar
          }
          alt="loading..."
          onClick={(e) => {
            navigate(`/profile/${Name.username}`);
            console.log("hi");
          }}
        />
        <strong>{Name.username}</strong>
        <p>{format(dataPost.createdAt)}</p>
        {user._id === dataPost.userId && (
          <DeleteOutlineIcon color="error" onClick={handleDelete} />
        )}
      </div>
      <p>{dataPost.desc}</p>
      {dataPost.img && (
        <img src={"http://localhost:8800/images/" + dataPost.img} alt="" />
      )}
      <div className="reactions" onClick={handleLikes}>
        <FavoriterBorderedIcon color="primary" />
        <strong>{postlike} Likes</strong>
      </div>
    </Paper>
  );
}

export default Post;
