import React from "react";
import { getUrlImage } from "../lib/image.helper";

const Typing = ({ currentfriend }) => {
  return (
    <div className="typing-message">
      <div className="friend-message">
        <div className="image-message-time">
          <img src={getUrlImage(currentfriend?.image)} alt="" />
          <div className="message-time">
            <div className="friend-text">
              <p className="time">Digitando mensagem.... </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typing;
