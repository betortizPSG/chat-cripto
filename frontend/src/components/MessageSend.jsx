import React, { useState } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import sendingSound from "../audio/sending.mp3";
import criptografar from "../criptografar";
import {
  ImageMessageSend,
  messageSend,
} from "../store/actions/messengerAction";

const MessageSend = (props) => {
  const { currentfriend, socket, themeState } = props;
  const [newMessage, setNewMessage] = useState("");
  const [sendingSPlay] = useSound(sendingSound);
  const { myInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const ImageSend = (e) => {
    if (e.target.files.length !== 0) {
      sendingSPlay();
      const imageName = `${Date.now()}-${e.target.files[0].name}`;
      const newImageName = `${imageName}`;

      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("reseverId", currentfriend._id);
      formData.append("imageName", newImageName);
      formData.append("image", e.target.files[0]);

      dispatch(ImageMessageSend(formData))
        .then((response) => {
          const { data } = response;
          const { message } = data;

          // Emit a socket event to notify all clients that a new image has been added
          socket.current.emit("sendMessage", message);
        })
        .catch((error) => {
          console.log(error);
          const { response } = error;
          const { data } = response;
          const { error: errorMessage } = data;
        });

      e.target.value = null;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    sendingSPlay();
    const data = {
      senderName: myInfo.userName,
      reseverId: currentfriend._id,
      message: newMessage ? newMessage : null,
      messageEncrypt: newMessage ? newMessage : null,
    };

    let result = criptografar(3, data.message); // aqui criptografou a mensagem
    data.messageEncrypt = result; // mensagem criptografada é salva em result

    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      reseverId: currentfriend._id,
      msg: "",
    });
    if (newMessage !== "") {
      dispatch(messageSend(data));
    }

    setNewMessage("");
  };

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.target.value === "" || e.shiftKey) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const data = {
        senderName: myInfo.userName,
        reseverId: currentfriend._id,
        message: newMessage ? newMessage : null,
        messageEncrypt: newMessage ? newMessage : null,
      };

      // Import da criptografia de cesar
      // setado como valor 3 da chave da criptografia como padrão
      let result = criptografar(3, data.message); // aqui criptografou a mensagem
      data.messageEncrypt = result; // mensagem criptografada é salva em result
      dispatch(messageSend(data));

      // message + \n + message
      setNewMessage("");
    }
  };

  return (
    <div className="message-send-section">
      <div className="file hover-image">
        <input
          onChange={ImageSend}
          accept="image/png, image/jpeg"
          type="file"
          id="pic"
          className="form-control"
        />

        <label htmlFor="pic">
          <FaPaperclip />
        </label>
      </div>
      {
        <div className="message-type">
          <textarea
            type="textarea"
            onChange={inputHandle}
            name="message"
            onKeyPress={inputHandle}
            id="message"
            placeholder="Aa"
            className="form-control"
            value={newMessage}
          />
        </div>
      }

      {
        <div onClick={sendMessage} className="file">
          <FaPaperPlane />
        </div>
      }

      <div className="emoji-section"></div>
    </div>
  );
};

export default MessageSend;
