const io = require("socket.io")(8900, { 
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const userFilter = (userid, socketid) => {
  !users.some((user) => user.userid === userid) &&
    users.push({ userid, socketid });
};
const userDelete = (socketid) => {
  return users = users.filter((user) => user.socketid !== socketid);
};
const sendMessage = (reciverId) => {
  return users.find((user) => user.userid === reciverId);
}; 
io.on("connection", (socket) => {
  console.log("user connected");
  io.emit("welcome", "hi from backend");
  // take userID and socketID 
  socket.on("userID", (m) => {
    userFilter(m, socket.id);
    io.emit("getusers", users);
  });

//   send and get message 
socket.on("sendMessage",({senderId,reciverId,text})=>{
  console.log("send Message")
 const reciver = sendMessage(reciverId);
 io.to(reciver?.socketid).emit("getMessage",{
  senderId ,
  text 
 })
})

//   disconnect
  socket.on("disconnect", () => {
    console.log("disconnected");
    userDelete(socket.id)
    io.emit("getusers", users);
  });
});
