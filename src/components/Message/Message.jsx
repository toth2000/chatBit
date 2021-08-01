import React from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";

const Message = ({ message: { user, text }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  let isSentByCurrentUser = user === trimmedName;

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pr-10">{trimmedName}</p>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <p className="sentText pl-10">{user}</p>
      <div className="messageBox backgroundLight">
        <p className="messageText colorBlack">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default Message;
