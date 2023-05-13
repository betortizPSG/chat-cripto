import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGOUT_SUCCESS,
  IDLE_USER,
  PROMPT_IDLE,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "../types/authType";
import axiosBaseURL from "../../config/configApi";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosBaseURL.post(
        "/api/messenger/user-register",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axiosBaseURL.post(
        "/api/messenger/user-login",
        data,
        config
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogout = () => async (dispatch) => {
  try {
    const response = await axiosBaseURL.post("/api/messenger/user-logout");
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
  } catch (error) {}
};

export const userIdle = () => async (dispatch) => {
  try {
    const response = await axiosBaseURL.post("/api/messenger/user-logout");
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: IDLE_USER,
      });
    }
  } catch (error) {}
};

export const promptIdle = () => async (dispatch) => {
  try {
    const response = await axiosBaseURL.post("/api/messenger/user-login");
    if (response.data.success) {
      dispatch({
        type: PROMPT_IDLE,
      });
    }
  } catch (error) {}
};

export const updateUser = (userCode, data) => {
  return async (dispatch) => {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    };
    try {
      const response = await axiosBaseURL.post(
        `/api/messenger/user-update/${userCode}`,
        data,
        config
      );

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          user: response.data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

