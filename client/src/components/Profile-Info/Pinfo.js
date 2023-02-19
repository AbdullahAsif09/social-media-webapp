import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../context/AuthContext";
import { Button, Paper } from "@mui/material";
import noAvatar from "../assets/noAvatar.png";
import "./pinfo.scss";
import axios from "axios";
function Pinfo({ username }) {
  const { user, dispatch } = useContext(CreateContext);
  const [Follow, setFollow] = useState();
  const [Img, setImg] = useState(true);
  const [file, setfile] = useState();
  const [FollowID, setFollowID] = useState();
  useEffect(() => {
    const FetchUser = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8800/api/users/usernameFind`,
          {
            username: username,
          }
        );
        // console.log(res);
        setFollow(res?.data);
        setFollowID(user?.followings.includes(res?.data?._id));
        // console.log(user?.followings.includes(res?.data?._id));
      } catch (error) {
        console.log(error);
      }
    };
    FetchUser();
  }, [username]);

  const handleClickFollow = async (e) => {
    e.preventDefault();

    if (user?.followings.includes(Follow?._id)) {
      console.log(`${Follow._id} see me `);
      dispatch({ type: "FOLLOW", payload: Follow?._id });
      try {
        const res = await axios.put(
          `http://localhost:8800/api/users/${Follow?._id}/follow`,
          { userId: user._id }
        );
        console.log(res);
        setFollowID(!FollowID);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(Follow._id);
      dispatch({ type: "UNFOLLOW", payload: Follow?._id });
      try {
        const res = await axios.put(
          `http://localhost:8800/api/users/${Follow?._id}/follow`,
          { userId: user._id }
        );
        setFollowID(!FollowID);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const uploadProfile = async(e)=>{
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("files", file);
      console.log(fileName)
      let image = {
        profilePicture:fileName
      }
      try {
        const res = await axios.post("http://localhost:8800/api/upload/profile",data);
        console.log(res)
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await axios.put(`http://localhost:8800/api/users/update/${user._id}`,image);
        console.log(res)
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleClickUnfollow = async (e) => {
    e.preventDefault();

    if (user?.followings.includes(Follow?._id)) {
      console.log(`${Follow._id} see me `);
      dispatch({ type: "FOLLOW", payload: Follow?._id });
      try {
        const res = await axios.put(
          `http://localhost:8800/api/users/${Follow?._id}/follow`,
          { userId: user._id }
        );
        console.log(res);
        setFollowID(!FollowID);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(Follow._id);
      dispatch({ type: "UNFOLLOW", payload: Follow?._id });
      try {
        const res = await axios.put(
          `http://localhost:8800/api/users/${Follow?._id}/follow`,
          { userId: user._id }
        );
        setFollowID(!FollowID);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // console.log(user);
  return (
    <div className="profileInfo">
      <label htmlFor="files" className="images">
        {/* <img src={noAvatar} alt="loading..." className="cover" /> */}
        {Follow?._id === user?._id && (
          <input
            type="file"
            name="files"
            id="files"
            onChange={(e) => {
              e.preventDefault();
              setfile(e.target.files[0]);
            }}
            accept=".png , .jpg , .jpeg"
            style={{ display: "none" }}
          />
        )}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="loading..."
            className="profilepictemp"
          />
        )}
        <img
          src={
            Follow?.profilePicture
              ? "http://localhost:8800/images/" + Follow?.profilePicture
              : noAvatar
          }
          alt="loading..."
          className="profilepic"
        />
        {file && (
          <div className="imageUpload">
            <Button variant="contained" color="primary" onClick={uploadProfile}>
              Upload
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                setfile(null);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </label>
      <Paper elevation={4} className="card">
        <h1>{username}</h1>
        {username !== user.username &&
          (FollowID === false ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickFollow}
            >
              Follow
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleClickUnfollow}
            >
              Unfollow
            </Button>
          ))}
      </Paper>
    </div>
  );
}

export default Pinfo;
