import { Button, Divider, Paper } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import noAvatar from "../../components/assets/noAvatar.png";
import SendIcon from "@mui/icons-material/Send";
import Conversations from "../../components/Conversations/Conversations.js";
import Message from "../../components/message/Message.js";
import Navbar from "../../components/Navbar/Navbar.js";
import "./messanger.scss";
import { CreateContext } from "../../context/AuthContext.js";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";
function Messanger() {
  const { user } = useContext(CreateContext);
  const [ConversationList, setConversationList] = useState();
  const [MessageHistory, setMessageHistory] = useState();
  const [arrivalMessage, setarrivalMessage] = useState();
  const [ChatUser, setChatUser] = useState();
  const [Socket, setSocket] = useState();
  const [currentChat, setcurrentChat] = useState();
  const createConvent = useRef(false);
  const scrollRef = useRef();
  const reciverRef = useRef();
  const conversationRef = useRef(null);
  const [NewMessage, setNewMessage] = useState();
  const [Friends, setFriends] = useState();
  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, [user]);
  useEffect(() => {
    Socket?.on("welcome", (m) => {
      // console.log(m)
    });
  }, [Socket]);
  useEffect(() => {
    Socket?.emit("userID", user._id);
    Socket?.on("getusers", (u) => {
      // console.log(u)
    });
  }, [Socket, user]);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage?.sender) &&
      setMessageHistory([...MessageHistory, arrivalMessage]);
    // // console.log("new message")
  }, [arrivalMessage]);
  useEffect(() => {
    Socket?.on("getMessage", (data) => {
      setarrivalMessage({
        sender: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  }, [Socket, user]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [MessageHistory]);

  useEffect(() => {
    const FetchFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/friends/${user._id}`
        );
        if (res.status === 200) {
          // console.log(res);
          setFriends(res.data);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    FetchFriends();
  }, [user]);

  useEffect(() => {
    const fetchChat = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(
            `http://localhost:8800/api/message/${currentChat?._id}`
          );
          // console.log(res);
          if (res?.status === 200) {
            setMessageHistory(res.data);
            // console.log("res 200");
          }
        } catch (error) {
          // console.log(error);
        }
      }
    };
    fetchChat();
  }, [currentChat]);

  useEffect(() => {
    const fetchConversation = async () => {
      // console.log(user?._id);
      try {
        const res = await axios.get(
          `http://localhost:8800/api/conversation/${user?._id}`
        );
        // console.log(res);
        setConversationList(res.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchConversation();
  }, [user]);

  const handleMessagehistory = async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversation/${user?._id}`
      );
      // console.log(res)

      let rec;
      res.data.map((f) => {
        rec = f.members.find((users) => users === e._id);
        if (rec) {
          conversationRef.current = f;
          //  setMessageHistory( null);
        }
        if (!rec) {
          // console.log("no conversation found");
          //  setMessageHistory( null);
        }
      });

      // console.log(conversationRef.current);
    } catch (error) {
      console.log(error);
    }
    if (conversationRef.current === null) {
      //  console.log("null ")
      setMessageHistory(null);
    }
    // console.log(e)
    if (conversationRef.current !== null) {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/message/${conversationRef.current?._id}`
        );
        // console.log(res);
        if (res?.status === 200) {
          setMessageHistory(res.data);
          conversationRef.current = null;
          // console.log("res 200");
        }
      } catch (error) {
        setMessageHistory(MessageHistory);
        // console.log(error);
      }
    }
  };

  const CreateConversation = async (userChat) => {
    // console.log(userChat);
    // console.log(" user Chat ");
    try {
      const res = await axios.post(
        "http://localhost:8800/api/conversation/new/",
        {
          senderId: user._id,
          reciverId: userChat._id,
        }
      );
      // window.location.reload();
      // console.log(res);
      if (res.status === 200) {
        CreateMessage(res?.data);
        setcurrentChat(res?.data._id);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const CreateMessage = async (conversation) => {
    // console.log(conversation);
    if (NewMessage) {
      const message = {
        sender: user?._id,
        text: NewMessage,
        conversationId: conversation?._id,
      };
      const reciverId = conversation.members.find((i) => i !== user._id);
      Socket?.emit("sendMessage", {
        senderId: user._id,
        reciverId: reciverId,
        text: NewMessage,
      });
      try {
        const res = await axios.post(
          `http://localhost:8800/api/message/new`,
          message
        );
        // console.log(res);
        MessageHistory === null
          ? setMessageHistory([res?.data])
          : setMessageHistory([...MessageHistory, res?.data]);
      } catch (error) {
        // console.log(error)
      }
      createConvent.current = null;
    } else {
      console.log("no conversation id");
      setMessageHistory(null);
    }
  };
  const handleConversationID = async (e) => {
    // console.log(e)
    const reciverId = e.members.find((u) => u !== user._id);
    try {
      const res = await axios.get(
        `http://localhost:8800/api/users/find/${reciverId}`
      );
      //  console.log(res)
      reciverRef.current = res.data;
    } catch (error) {
      // console.log(error)
    }
    if (reciverRef.current) {
      setChatUser(reciverRef.current);
    } else {
    }
  };
  const handleSendMessage = () => {
    const authConversation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/conversation/${user?._id}`
        );
        if (res.status === 200 && ChatUser) {
          res.data.map((f) => {
            const findMember = f?.members?.find(
              (users) => users === ChatUser?._id
            );
            // console.log(findMember);
            if (findMember) {
              createConvent.current = f;
              // console.log(createConvent.current);
            }
          });
          if (createConvent.current) {
            setcurrentChat(createConvent.current);
            CreateMessage(createConvent.current);
            // return console.log("conversation found " + createConvent.current);
          }
          if (!createConvent.current) {
            CreateConversation(ChatUser);
            // return console.log("no conversation");
          }
        } else {
          CreateConversation(ChatUser);
          // console.log("no user selected");
        }
      } catch (error) {
        CreateConversation(ChatUser);
        // console.log(error);
      }
    };
    authConversation();
  };

  return (
    <div className="messanger">
      <Navbar />
      <div className="container">
        <Paper elevation={8} className="right">
          <div className="wrapper">
            <div>
              <Divider></Divider>
              <h2>Conversations</h2>
              <Divider></Divider>
            </div>
            {ConversationList?.map((e) => {
              return (
                <div
                  className="listConversation"
                  onClick={(f) => {
                    f.preventDefault();
                    // console.log(e);
                    setcurrentChat(e);
                    handleConversationID(e);
                  }}
                  key={e?._id}
                >
                  <Conversations list={e} />
                </div>
              );
            })}
            <div>
              <Divider></Divider>
              <h2>Friends</h2>
              <Divider></Divider>
            </div>
            {Friends?.map((e) => {
              return (
                <div
                  className="friendsOnline"
                  onClick={() => {
                    setChatUser(e);
                    handleMessagehistory(e);

                    // console.log(e)
                  }}
                  key={e._id}
                >
                  <img
                    src={
                      e?.profilePicture
                        ? "http://localhost:8800/images/" + e?.profilePicture
                        : noAvatar
                    }
                    alt="."
                  />
                  <strong>{e?.username}</strong>
                </div>
              );
            })}
          </div>
        </Paper>
        <Paper elevation={8} className="center">
          <div className="wrapper">
            <div className="topChat" ref={scrollRef}>
              {currentChat ? (
                MessageHistory?.map((e) => {
                  return (
                    <div ref={scrollRef}>
                      <Message
                        key={e._id}
                        messages={e}
                        own={e.sender === user._id}
                      />
                    </div>
                  );
                })
              ) : (
                <strong>Send a message.......</strong>
              )}
            </div>
            <div className="bottomChat">
              <input
                placeholder="send a message"
                onChange={(e) => {
                  e.preventDefault();
                  setNewMessage(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <SendIcon />
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Messanger;
