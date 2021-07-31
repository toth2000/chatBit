import React from "react";

import companyLogo from "../../icons/companyLogo.png";
import "./InfoBar.css";
import closeImg from "../../icons/close.png";

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <img className="companyLogo" src={companyLogo} alt="chatbit-logo" />

      <h3>{room}</h3>

        <a className="closeBtn" href="https://toth2000.github.io/chatBit/">
          <img src={closeImg} alt="closeImg" />
        </a>
    </div>
  );
};

export default InfoBar;
