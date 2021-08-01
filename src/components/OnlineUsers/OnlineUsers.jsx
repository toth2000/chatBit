import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./OnlineUsers.css";


const OnlineUsers = ({ roomData }) => {
  const userList = roomData.users;
  console.log("chatUsers", userList);

  return (
    <div className="onlineUserList">
      <h2>{'Room: ' + roomData.room}</h2>
      <h3>Users Online</h3>
      <ScrollToBottom className="scrollOnlineUser" >
        {userList.map((x) => (
          <div className="onlineUsers" key={x.id}>
            <h4>{x.name}</h4>
            <img src="https://img.icons8.com/emoji/16/000000/green-circle-emoji.png" alt="greenCircle"/>
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default OnlineUsers;
