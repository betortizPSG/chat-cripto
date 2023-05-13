import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  SOCKET_MESSAGE,
  UPDATE_FRIEND_MESSAGE,
  MESSAGE_SEND_SUCCESS_CLEAR,
  SEEN_MESSAGE,
  DELIVARED_MESSAGE,
  UPDATE,
  MESSAGE_GET_SUCCESS_CLEAR,
  SEEN_ALL,
  LOGOUT_SUCCESS,
  NEW_USER_ADD,
  NEW_USER_ADD_CLEAR,
  PAGINATE_MESSAGE
} from "../types/messengerType";

const messengerState = {
  friends: [],
  message: [],
  mesageSendSuccess: false,
  message_get_success: false,
  themeMood: "",
  new_user_add: "",
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "THEME_GET_SUCCESS":
    case "THEME_SET_SUCCESS":
      return {
        ...state,
        themeMood: payload.theme,
      };
    
    case FRIEND_GET_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
      };
    
    case MESSAGE_GET_SUCCESS:
      return {
        ...state,
        message_get_success: true,
        message: payload.message,
        totalPage: payload.totalPage
      };
    
    case PAGINATE_MESSAGE:
      return {
        ...state,
        message_get_success: true,
        message: [...payload.message , ...state.message],
        totalPage: payload.totalPage
      };
    
    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        mesageSendSuccess: true,
        message: [...state.message, payload.message],
      };
    
    case SOCKET_MESSAGE:
      return {
        ...state,
        message: [...state.message, payload.message],
      };
    
    case UPDATE_FRIEND_MESSAGE:
      const index = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === payload.msgInfo.reseverId ||
          f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[index].msgInfo = payload.msgInfo;
      state.friends[index].msgInfo.status = payload.status;
      return state;
    
    case MESSAGE_SEND_SUCCESS_CLEAR:
      return {
        ...state,
        mesageSendSuccess: false,
      };
    
    case SEEN_MESSAGE:
      const indexSeen = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === payload.msgInfo.reseverId ||
          f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[indexSeen].msgInfo.status = "seen";
      return {
        ...state,
      };
    
    case DELIVARED_MESSAGE:
      const indexDelivered = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === payload.msgInfo.reseverId ||
          f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[indexDelivered].msgInfo.status = "delivared";
      return {
        ...state,
      };
    
    case UPDATE:
      const indexUpdate = state.friends.findIndex((f) => f.fndInfo._id === payload.id);
      if (state.friends[indexUpdate].msgInfo) {
        state.friends[indexUpdate].msgInfo.status = "seen";
      }
      return {
        ...state,
      };
    
    case MESSAGE_GET_SUCCESS_CLEAR:
      return {
        ...state,
        message_get_success: false,
      };
    
    case SEEN_ALL:
      const indexSeenAll = state.friends.findIndex(
        (f) => f.fndInfo._id === payload.reseverId
      );
      state.friends[indexSeenAll].msgInfo.status = "seen";
      return {
        ...state,
      };
    
    case LOGOUT_SUCCESS:
      return {
        ...state,
        friends: [],
        message: [],
        mesageSendSuccess: false,
        message_get_success: false,
      };
    
    case NEW_USER_ADD:
      return {
        ...state,
        new_user_add: payload.new_user_add,
      };
    
    case NEW_USER_ADD_CLEAR:
      return {
        ...state,
        new_user_add: "",
      };
    
    default:
      return state;
  }  
};
