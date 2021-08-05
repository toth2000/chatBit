import React, { useState, useEffect } from "react";
import queryString from "query-string"; //For retriving data from Url
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import OnlineUsers from "../OnlineUsers/OnlineUsers";

let socket;

const Chat = ({ location }) => {
  //State of component
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomData, setRoomData] = useState({ room: "", users: [] });

  const ENDPOINT = "https://toth2000-chat-bit.herokuapp.com/";
  // const ENDPOINT = "http://localhost:5000/";
  
  /**This hook handle new connection and disconnection*/
  useEffect(() => {
    //It is a reactHook, its equivalent is componentDidMount and componentDidUpdate
    const { name, room } = queryString.parse(location.search); //location.search returns URL from ? and parser parses the data
    
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (err) => {
      if (err) alert("An Error Occured. Rejoin again");
    }); //Sending data to backend
  }, [ENDPOINT, location.search]); //useEffect() will be called when value of array element changes

  /**This hook handle messages  */
  useEffect(() => {
    //With hooks we can have many useEffect
    socket.on("message", (message) => {
      setMessages([...messages, message]);
 
      socket.on("roomData", (x) => {
        if (x) setRoomData(x);
      });

    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    /**The above event prevent react from refreshing the whole page for a key press event */

    if (message) {
      socket.emit("sendMessage", message, (err) => setMessage(""));
    }
  };

  return (
    <div className="chatContainer">
      <div className="chatOuterContainer">
        <div className="chatInfoBar">
          <InfoBar room={room} />
        </div>
        <div className="chatRoomData">
          <OnlineUsers roomData={roomData} />
        </div>
        <div className="chatMessageBox">
          <Messages messages={messages} name={name} />
          <div className="chatInput">
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
