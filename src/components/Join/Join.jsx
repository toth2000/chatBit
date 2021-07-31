import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";
import companyLogo from "../../icons/companyLogo.png";
import groupChatImg from "../../icons/groupChat.png";
import gitHubLogo from "../../icons/github.png";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <img className="logoImg" src={companyLogo} alt="logo" />
      <img className="groupChatImg" src={groupChatImg} alt="groupChatImage" />
      <div className="features">
        <h1>A Real-Time Chat Room App</h1>
        <div className="subFeatures">
          <h3>Free | No Ads | Open Source</h3>
          <a href="https://github.com/toth2000/chatBit" target="_blank" rel="noreferrer">
          <img className="githubImg" src={gitHubLogo} alt="github logo"/>
          </a>
        </div>
      </div>
      <div className="joinInnerContainer">
        <h2 className="heading">Join Room</h2>
        <input
          placeholder="Name"
          className="joinInput"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Room"
          className="joinInput"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />
        <Link
          className="buttonLink"
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="joinButton" type="submit">
            Join Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
