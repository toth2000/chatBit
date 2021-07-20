import React from 'react';
import './InfoBar.css';

const InfoBar = ({room})=>{
   return (
   <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={""} alt="icon"/>
            <h3>{room}</h3>
        </div>
        
        <div className="rightInnerContainer">
            <a href="https://toth2000.github.io/chatBit/"><img src={""} alt="closeImg"/></a>
        </div>
    </div>
    );
}

export default InfoBar;