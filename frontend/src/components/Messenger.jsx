import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import useSound from "use-sound";
import notificationSound from "../audio/notification.mp3";

import {
  getFriends,
  getMessage,
  getTheme,
  seenMessage,
  updateMessage,
} from "../store/actions/messengerAction";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

const Messenger = () => {
  const [notificationSPlay] = useSound(notificationSound);

  const scrollRef = useRef();
  const socket = useRef();

  const {
    friends,
    message,
    mesageSendSuccess,
    message_get_success,
    themeMood,
    new_user_add,
  } = useSelector((state) => state.messenger);

  const { myInfo } = useSelector((state) => state.auth);
  const [currentfriend, setCurrentFriend] = useState("");
  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [themeState, setThemeState] = useState(true);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET);
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });

    socket.current.on("msgSeenResponse", (msg) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("msgDelivaredResponse", (msg) => {
      dispatch({
        type: "DELIVARED_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentfriend) {
      if (
        socketMessage.senderId === currentfriend._id &&
        socketMessage.reseverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
        dispatch(seenMessage(socketMessage));
        socket.current.emit("messageSeen", socketMessage);
        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            msgInfo: socketMessage,
            status: "seen",
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo.id);
      setActiveUser(filterUser);
    });

    socket.current.on("new_user_add", (data) => {
      dispatch({
        type: "NEW_USER_ADD",
        payload: {
          new_user_add: data,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentfriend._id &&
      socketMessage.reseverId === myInfo.id
    ) {
      notificationSPlay();
      dispatch(getFriends());
      toast.success(`${socketMessage.senderName} mandou uma nova mensagem`);
      dispatch(updateMessage(socketMessage));

      socket.current.emit("delivaredMessage", socketMessage);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: socketMessage,
          status: "delivared",
        },
      });
    }
  }, [socketMessage]);

  useEffect(() => {
    if (mesageSendSuccess) {
      socket.current.emit("sendMessage", message[message.length - 1]);
      scrollRef.current?.scroll({ top: scrollRef.current.scrollHeight });
      dispatch(getFriends());
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: message[message.length - 1],
        },
      });
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
  }, [mesageSendSuccess]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
    dispatch({ type: "NEW_USER_ADD_CLEAR" });
  }, [new_user_add]);

  useEffect(() => {
    dispatch(getMessage(currentfriend._id));
  }, [currentfriend?._id]);

  useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== myInfo.id &&
        message[message.length - 1].status !== "seen"
      ) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: currentfriend._id,
          },
        });
        socket.current.emit("seen", {
          senderId: currentfriend._id,
          reseverId: myInfo.id,
        });
        dispatch(seenMessage({ _id: message[message.length - 1]._id }));
      }
    }
    dispatch({
      type: "MESSAGE_GET_SUCCESS_CLEAR",
    });
  }, [message_get_success]);

  useEffect(() => {
    if (message.length == 20) {
      scrollRef.current?.scroll({ top: scrollRef.current.scrollHeight });
    }
  }, [message]);

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  return (
    <>
      <div className={themeMood === "dark" ? "messenger theme" : "messenger"}>
        <Toaster
          position={"top-right"}
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "18px",
            },
          }}
        />

        <div className="alinhamento">
          <div className="msg-min col-3">
            <LeftSide
              friends={friends}
              themeMood={themeMood}
              myInfo={myInfo}
              activeUser={activeUser}
              currentfriend={currentfriend}
              setCurrentFriend={setCurrentFriend}
              themeState={themeState}
              setThemeState={setThemeState}
            />
          </div>
          <div className="msg-max col-sm-9 col-12">
            <RightSide
              currentfriend={currentfriend}
              message={message}
              scrollRef={scrollRef}
              activeUser={activeUser}
              typingMessage={typingMessage}
              socket={socket}
              themeMood={themeMood}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
