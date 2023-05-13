import React from "react";
import FriendList from "./FriendList";
import SearchFriends from "./SearchFriends";
import Friends from "./Friends";
import UserProfile from "./userProfile/UserProfile";
import DropUpProfile from "./userProfile/DropUpProfile";

const LeftSide = (props) => {
  const {
    friends,
    themeMood,
    myInfo,
    activeUser,
    currentfriend,
    setCurrentFriend,
    themeState,
    setThemeState,
  } = props;

  return (
    <div className="left-side">
      <SearchFriends />

      <div className="friends">
        <FriendList themeMood={themeMood} />

        <div className="mensagens-recentes ">Mensagens recentes:</div>
        {friends && friends.length > 0
          ? friends.map((fd) => (
              <div
                key={fd.fndInfo._id}
                onClick={() => setCurrentFriend(fd.fndInfo)}
                className={
                  currentfriend._id === fd.fndInfo._id
                    ? "hover-friend active"
                    : "hover-friend"
                }
              >
                <Friends activeUser={activeUser} myId={myInfo.id} friend={fd} />
              </div>
            ))
          : "Você não tem amigos!!"}
      </div>
      <div className="top">
        <UserProfile myInfo={myInfo} />
        <DropUpProfile
          themeMood={themeMood}
          themeState={themeState}
          setThemeState={setThemeState}
        />
      </div>
    </div>
  );
};

export default LeftSide;
