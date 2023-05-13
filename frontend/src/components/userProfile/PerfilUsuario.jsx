import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getUrlImage } from "../../lib/image.helper";
import { BsInfoCircle } from "react-icons/bs";
import { getTheme } from "../../store/actions/messengerAction";
import { useDispatch, useSelector } from "react-redux";
import Input from "../authentication/Input";
import { updateUser } from "../../store/actions/authAction";

export default function PerfilUsuario({ userCode }) {
  const { myInfo } = useSelector((state) => state.auth);
  const { themeMood } = useSelector((state) => state.messenger);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    userName: "",
    email: "",
    image:"",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputHandle = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateUser(userCode, state));
  };


  useEffect(() => {
    dispatch(getTheme());
  }, []);

  return (
    <>
      <BsInfoCircle className="btn-perfil" onClick={handleShow}>
        Abrir
      </BsInfoCircle>

      <Offcanvas className="userProfile" show={show} onHide={handleClose}>
        <div className={themeMood === "dark" ? "messenger theme" : "messenger"}>
          <Offcanvas.Header closeButton closeVariant={themeMood === "dark" && "white" }>
            <Offcanvas.Title>Perfil de Usuário</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body">
            <form onSubmit={handleSubmit}>
              <div className="icon-user">
                <img
                  className="image-perfil"
                  src={getUrlImage(myInfo.image) || `/image-default-no-background.png`} 
                  alt=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="userName">Nome:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="userName"
                  value={state.userName}
                  onChange={inputHandle}
                  placeholder={myInfo.userName}
                />
                <label htmlFor="userName">ID:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="userCode"
                  value={myInfo.userCode}
                  onChange={inputHandle}
                  disabled
                />
                <label htmlFor="userName">email:</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={myInfo.email}
                  onChange={inputHandle}
                  disabled
                />
                <div>
                  <div className="content-image">
                    <div>
                      <label className="label-image" htmlFor="image">
                        Carregar image
                      </label>
                      <Input
                        name="image"
                        type="file"
                        className="btn-image-1"
                        id="image"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                    <div>
                      <Input
                        type="button"
                        value="Excluir Imagem"
                        className="btn-image"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="submit"
                      // onSubmit={TODO}
                      value="Salvar"
                      className="btn-salvar"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}
