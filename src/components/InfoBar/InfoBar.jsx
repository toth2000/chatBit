import React from "react";

import companyLogo from "../../icons/companyLogo.png";
import "./InfoBar.css";
import closeImg from "../../icons/close.png";

const InfoBar = () => {
  return (
    <div className="infoBar">
      <img className="companyLogo" src={companyLogo} alt="chatbit-logo" />
      <a className="closeBtn" href={process.env.PUBLIC_URL}>
        <img className="closeBtnImg" src={closeImg} alt="closeImg" />
      </a>
    </div>
  );
};

export default InfoBar;
