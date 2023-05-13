import React from "react";

const SearchFriends = () => {
  const search = (e) => {
    const getFriendClass = document.getElementsByClassName("hover-friend");
    const friendNameClass = document.getElementsByClassName("Fd_name");
    for (var i = 0; i < getFriendClass.length, i < friendNameClass.length; i++) {
      let text = friendNameClass[i].innerText.toLowerCase();
      if (text.indexOf(e.target.value.toLowerCase()) > -1) {
        getFriendClass[i].style.display = "";
      } else {
        getFriendClass[i].style.display = "none";
      }
    }
  };

  return (
    <div>
      <div className="friend-search">
        <input className="search" onChange={search} type="text" placeholder="Busca conversa" />
      </div>
    </div>
  );
};

export default SearchFriends;
