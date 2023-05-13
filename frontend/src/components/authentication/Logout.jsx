import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/actions/authAction";
import { BiLogOut } from "react-icons/bi";

import "bootstrap/dist/css/bootstrap.min.css";

const Logout = (props) => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.auth);
  // Effect altera o State para mudar o tema

  const logout = () => {
    dispatch(userLogout());
    props.socket.current.emit("logout", myInfo.id);
    props.socket.current.disconnect();
  };

  return (
    <>
      <div className="body">
        <div onClick={logout} className="image-logout" id="image-logout">
          <BiLogOut size={30} />
          <br />
          Sair
        </div>
      </div>
    </>
  );
};

export default Logout;
