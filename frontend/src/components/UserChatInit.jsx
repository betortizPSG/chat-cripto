import moment from 'moment';
import React from 'react';
import { getUrlImage } from '../lib/image.helper';

const UserChatInit = ({ currentfriend }) => {
  return (
    <div className="friend_connect">
      <img src={getUrlImage(currentfriend?.image)} alt="" />
      <h3>{currentfriend.userName} Conectou</h3>
      <span>{moment(currentfriend.createdAt).startOf('mini').fromNow()} </span>
    </div>
  );
};

export default UserChatInit;
