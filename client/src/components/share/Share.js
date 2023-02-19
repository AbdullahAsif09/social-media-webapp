import React, {  useContext, useRef, useState } from 'react'
import "./share.scss"
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "../assets/img.png";
import noAvatar from "../assets/noAvatar.png";
import { Button, Divider, Paper } from '@mui/material';
import { CreateContext } from "../../context/AuthContext";
import axios from 'axios';
function Share() {
  const [file, setfile] = useState(null)
  const inputData = useRef()
  const {user} = useContext(CreateContext)
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(`${file} name`)
    const fetchData =async()=>{
      if (file) {
        const data = new FormData()
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
        const postData = {
          userId: user._id,
          desc: inputData.current.value,
          img:fileName,
        };
        try {
          const res = await axios.post(
            "http://localhost:8800/api/upload", 
            data
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/create",
            postData
          );
          window.location.reload();
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("i am post without pic")
        const postData = {
          userId:user._id,
          desc:inputData.current.value,
        }
        try {
          const res = await axios.post("http://localhost:8800/api/posts/create",postData);
          window.location.reload();
          console.log(res) 
        } catch (error) {
          console.log(error)
        }
        
      }
    }
    fetchData();
    // console.log(e);
  }
  return (
    <Paper elevation={8} className="Share">
      <div className="container">
        <div className="top">
          {/* <img src={"http://localhost:8800/images/"+ user?.profilePicture || noAvatar } alt="loading..." /> */}
          <input ref={inputData} placeholder="What's on your mind today" />
        </div>
        <div className="mid">
          <Divider></Divider>
        </div>
        {
          file && (
            <div className='shareImg'>
              <img src={URL.createObjectURL(file)} alt='loading' />
              <CancelIcon className="shareCancelImg" onClick={() => setfile(null)} />
            </div>
          )
        }
        <form
          className="bottom"
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data" 
        >
          <label htmlFor="file">
          <input type="file" name='file' id="file" accept='.png , .jpg , .jpeg' onChange={(e)=>{
             e.preventDefault(); 
              return (setfile(e.target.files[0]))
             }} style={{ display: "none" }} />
            <div className="item">
              <img src={Image} alt="" height="20px" />
              <span>Add Image</span> 
            </div>
          </label>
          <Button type="onsubmit" variant="contained">
            Post
          </Button>
        </form>
      </div>
    </Paper>
  );
}

export default Share