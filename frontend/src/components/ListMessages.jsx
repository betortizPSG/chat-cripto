import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateMessage } from "../store/actions/messengerAction";
import MessageItem from "./MessageItem";
import Typing from "./Typing";
import UserChatInit from "./UserChatInit";

const ListMessages = ({
  show,
  message,
  currentfriend,
  scrollRef,
  typingMessage,
  checkboxHover,
}) => {
  const { myInfo } = useSelector((state) => state.auth);
  const { totalPage } = useSelector((state) => state.messenger);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {

      if (scrollRef.current.scrollTop < 320) {
        if (currentPage < totalPage) {
          const nextPage = currentPage + 1;
          if (currentPage < totalPage) {
            dispatch(paginateMessage(currentfriend._id, nextPage));
            setCurrentPage(nextPage);
          }
        }
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef.current, totalPage, currentPage]);

  return (
    <>
      <div ref={scrollRef} id="show-messages" className="message-show">
        {message && message.length > 0 ? (
          message.map((message) => (
            <MessageItem
              key={message._id}
              checkboxHover={checkboxHover}
              currentfriend={currentfriend}
              message={message}
              scrollRef={scrollRef}
              show={show}
              isMyMessage={message.senderId === myInfo.id}
            />
          ))
        ) : (
          <UserChatInit currentfriend={currentfriend} />
        )}
      </div>
      {typingMessage &&
        typingMessage.msg &&
        typingMessage.senderId === currentfriend._id && (
          <Typing currentfriend={currentfriend} />
        )}
    </>
  );
};

export default ListMessages;
