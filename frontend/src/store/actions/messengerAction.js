import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  PAGINATE_MESSAGE,
} from "../types/messengerType";
import axiosBaseURL from "../../config/configApi"


export const getFriends = () => async (dispatch) => {
  const authToken = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
  };
  if (!authToken) {
    return console.log("Please login first");
  }
  try {
    const response = await axiosBaseURL.get("/api/messenger/get-friends", config);
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  const authToken = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
  };

  const { senderName, reseverId, message, messageEncrypt } = data;

  if (!senderName || !reseverId || !message || !messageEncrypt) {
    console.error("senderName, reseverId, message, and messageEncrypt fields are required");
    return;
  }

  try {
    const response = await axiosBaseURL.post("/api/messenger/send-message", data, config);

    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,

      },
    });
  } catch (error) {
    console.error("Error sending message:", error);

  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    };

    ///api/messenger/get-message/${id}?pag=1

    try {
      const response = await axiosBaseURL.get(`/api/messenger/get-message/${id}?page=1`, config);

      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message,
          totalPage: response.data.totalPage
        },
      });

    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const paginateMessage = (id, page) => {
  return async (dispatch) => {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    };

    ///api/messenger/get-message/${id}?pag=1

    try {
      const response = await axiosBaseURL.get(`/api/messenger/get-message/${id}?page=${page}`, config);

      dispatch({
        type: PAGINATE_MESSAGE,
        payload: {
          message: response.data.message,
          totalPage: response.data.totalPage
        },
      });

    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const ImageMessageSend = (data) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    }

    const response = await axiosBaseURL.post(
      "/api/messenger/image-message-send",
      data, config
    );
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,

      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const seenMessage = (msg) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    }
    const response = await axiosBaseURL.post("/api/messenger/seen-message", msg, config);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = (msg) => async (dispatch) => {
  try {
    const response = await axiosBaseURL.post("/api/messenger/delivared-message", msg);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const getTheme = () => async (dispatch) => {
  const theme = localStorage.getItem("theme");
  dispatch({
    type: "THEME_GET_SUCCESS",
    payload: {
      theme: theme ? theme : "white",
    },
  });
};

export const themeSet = (theme) => async (dispatch) => {
  localStorage.setItem("theme", theme);
  dispatch({
    type: "THEME_SET_SUCCESS",
    payload: {
      theme: theme,
    },
  });
};
