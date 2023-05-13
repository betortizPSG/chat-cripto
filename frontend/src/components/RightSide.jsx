import { useState, useEffect } from "react";

import { getUrlImage } from "../lib/image.helper";
import BuscaMsg from "./HeaderChat/BuscaMsg";
import Criptografia from "./HeaderChat/Criptografia";
import ListMessages from "./ListMessages";
import HoverMessage from "./HeaderChat/HoverMessage";
import MessageSend from "./MessageSend";
import BemVindo from "./Welcome";
import { useSelector } from "react-redux";

const RightSide = (props) => {
  const [show, setShow] = useState(true);
  const [checkboxHover, setCheckboxHover] = useState(false);
  const [bemVindo, setBemVindo] = useState(true);
  const { themeMood } = useSelector((state) => state.messenger);

  const onChangeShow = (valor) => {
    setTimeout(() => {
      setShow(!valor);
    }, "100");
  };

  const onIdleShow = (valor) => {
    if (valor === false) {
      setTimeout(() => {
        setShow(true);
      }, "100");
    }
  };
  const onChangeCheckboxHover = (valor) => {
    setCheckboxHover(!valor);
  };

  const { currentfriend, message, scrollRef, activeUser, typingMessage } =
    props;

  const [state, setState] = useState(false);

  useEffect(() => {
    if (currentfriend) {
      setBemVindo(false);
    }
  }, [currentfriend._id]);

  return (
    <>
      <div className="">
        <div className="right-side">
          <input type="checkbox" id="dot" />
          <div className="row alinhamento">
            <div className="rs-max">
              {bemVindo ? (
                <BemVindo themeMood={themeMood} />
              ) : (
                <div id="message-core" className="message-send-show">
                  <div className="header">
                    <div className="image-name">
                      <div className="image">
                        <img src={getUrlImage(currentfriend?.image)} alt="" />

                        {activeUser &&
                        activeUser.length > 0 &&
                        activeUser.some(
                          (u) => u.userId === currentfriend._id
                        ) ? (
                          <div className="active-icon"></div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="name">
                        <h4>{currentfriend.userName} </h4>
                      </div>

                      {activeUser &&
                      activeUser.length > 0 &&
                      activeUser.some((u) => u.userId === currentfriend._id) ? (
                        <div className="active-icon"></div>
                      ) : (
                        ""
                      )}
                    </div>{" "}
                    <BuscaMsg currentfriend={currentfriend} />
                    <HoverMessage
                      state={state}
                      setCheckboxHover={setCheckboxHover}
                      checkboxHover={checkboxHover}
                      setState={setState}
                    />
                    <div>
                      <Criptografia
                        show={show}
                        setShow={setShow}
                        changeShow={onChangeShow}
                        idleShow={onIdleShow}
                      />
                    </div>
                  </div>

                  <ListMessages
                    show={show}
                    checkboxHover={checkboxHover}
                    changeCheckboxHover={onChangeCheckboxHover}
                    message={message}
                    currentfriend={currentfriend}
                    scrollRef={scrollRef}
                    typingMessage={typingMessage}
                  />

                  <MessageSend
                    socket={props.socket}
                    currentfriend={currentfriend}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
