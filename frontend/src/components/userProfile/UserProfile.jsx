import React from "react";
import { getUrlImage } from "../../lib/image.helper";
import PerfilUsuario from "./PerfilUsuario";

const UserProfile = ({ myInfo }) => {
  return (
    <>
      <div className="user-image-bottom">
        <div className="image">
          <img src={getUrlImage(myInfo?.image)} alt="" />
        </div>
        <div className="regular-text">
          <h5 className="align-start">{myInfo.userName}</h5>
          <span>ID: {myInfo.userCode}</span>
        </div>
      </div>
      <div className="btn-perfil-usuario">
        <PerfilUsuario />
      </div>
      </>
   );
};

export default UserProfile;
