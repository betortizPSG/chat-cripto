import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../store/actions/authAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../../store/types/authType";
import Input from './Input'

const Login = () => {
  const navigate = useNavigate();

  const alert = useAlert();

  const { authenticate, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event) => {
    event.preventDefault();
    dispatch(userLogin(state));
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
      error.map((error) => alert.error(error));
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
            style={{ width: "140px", height: "100px" }}
          />
        </div>

        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email"></label>
              <Input
                type="email"
                className="form-control"
                onChange={inputHandle}
                name="email"
                value={state.email}
                placeholder="Seu email"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"></label>
              <Input
                type="password"
                onChange={inputHandle}
                name="password"
                className="form-control"
                value={state.password}
                placeholder="Sua senha"
                id="password"
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Entrar" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/register"> Faça seu cadastro </Link>
                <br />
                {/*  <Link to="/messenger/Forgot"> Esqueci minha senha </Link> */}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
