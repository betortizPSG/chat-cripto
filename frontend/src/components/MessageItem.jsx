import moment from "moment";
import React, { useState } from "react";

const MessageItem = ({
  scrollRef,
  checkboxHover,
  show,
  message,
  currentfriend,
  isMyMessage,
}) => {
  const [hasHoverItem, setHasHoverItem] = useState();

  const onHover = (m) => {
    if (checkboxHover) {
      setHasHoverItem(m._id);
    }
  };

  const offHover = () => {
    setHasHoverItem();
  };

  const showMessage = (message) => {
    if (!show) {
      return message.message.text;
    } else if (message._id === hasHoverItem) {
      return message.message.text;
    } else {
      return message.message.messageEncrypt;
    }
  };

  const showImage = (message) => {
    if (!show) {
      return true;
    } else {
      return message._id === hasHoverItem;
    }
  };

  const friendMessageBallon = () => {};

  return (
    <div className={isMyMessage ? "my-message" : "friend-message"}>
      <div className="image-message">
        <div className={isMyMessage ? "my-text" : "friend-text"}>
          <p
            className={isMyMessage ? "message-text" : "friend-message-text"}
            onMouseEnter={() => onHover(message)}
            onMouseLeave={() => offHover()}
          >
            {message.message.messageEncrypt === "" ? (
              <span
                className="blur"
                style={{
                  filter: showImage(message) ? "blur(0px)" : "blur(14px)",
                }}
                onMouseEnter={() => onHover(message)}
                onMouseLeave={() => offHover()}
              >
                <img
                  src={`${process.env.REACT_APP_API}api/messenger/image/${message.message.image}`}
                  alt="sending attach"
                />
              </span>
            ) : (
              <span>{showMessage(message)}</span>
            )}
          </p>
        </div>
      </div>
      <div className="time">
        {moment(message.createdAt).startOf("mini").fromNow()}
      </div>
    </div>
  );
};

export default MessageItem;
