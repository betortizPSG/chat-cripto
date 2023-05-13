import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../store/actions/authAction";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../../store/types/authType";
import Input from "./Input";
import InfoImage from "../InfoImagem";

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const ONE_MEGABYTE = 1048576;

  const { authenticate, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [state, setstate] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  const inputHandle = (event) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const fileHendle = (event) => {
    const size = event.target.files[0].size;
    const isFileSizeLessThan1MB = size < ONE_MEGABYTE;

    if (event.target.files.length === 0 || !isFileSizeLessThan1MB) {
      alert.error("Arquivo não suportado");
      return;
    }

    setstate({
      ...state,
      [event.target.name]: event.target.files[0],
    });

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const register = (event) => {
    const { userName, email, password, confirmPassword, image } = state;
    event.preventDefault();
    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [successMessage, error]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <img
            src="./logoPsg.svg"
            alt="logo PSG"
            style={{ width: "140px", height: "70px" }}
          />
        </div>

        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username"></label>
              <Input
                type="text"
                onChange={inputHandle}
                name="userName"
                value={state.userName}
                className="form-control"
                placeholder="Seu nome *"
                id="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email"></label>
              <Input
                type="email"
                onChange={inputHandle}
                name="email"
                value={state.email}
                className="form-control"
                placeholder="Seu email *"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"></label>
              <Input
                type="password"
                onChange={inputHandle}
                name="password"
                value={state.password}
                className="form-control"
                placeholder="Sua senha *"
                id="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword"></label>
              <Input
                type="password"
                onChange={inputHandle}
                name="confirmPassword"
                value={state.confirmPassword}
                className="form-control"
                placeholder="Confirme sua senha *"
                id="confirmPassword"
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  <img src={loadImage || `/image-default-no-background.png`} />
                </div>
                <div className="file">
                  <label htmlFor="image">Selecione uma foto</label>
                  <Input
                    type="file"
                    onChange={fileHendle}
                    name="image"
                    className="form-control"
                    id="image"
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <div>
                    <InfoImage />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <span style={{ color: "#2ca999" }}>
                ( * ) Campos obrigatórios
              </span>
              <div className="class-btn">
                <Input type="submit" value="Cadastrar" className="btn" />
              </div>
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/login"> Entre na sua conta </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
