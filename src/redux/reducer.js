import { Action } from "history";
import * as types from "./actionTypes";

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
  sendResetLink: false,
  isRegestered: false,
};

console.log(
  initialState.currentUser,
  initialState.loading,
  "current user in reducer"
);

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
    case types.LOGOUT_START:
    case types.STRAPI_LOGIN_START:
    case types.STRAPI_REGISTER_START:
    case types.STRAPI_FORGOT_PASSWORD_START:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_SUCCESS:
    case types.STRAPI_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegestered: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
    case types.TWITTER_LOGIN_FAIL:
    case types.FACEBOOK_LOGIN_FAIL:
    case types.APPLE_LOGIN_FAIL:
    case types.STRAPI_LOGIN_FAIL:
    case types.STRAPI_REGISTER_FAIL:
    case types.STRAPI_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.STRAPI_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
      };

    case types.FORGOT_PASSWORD_START:
      return {
        ...state,
        sendResetLink: false,
        loading: true,
      };

    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        sendResetLink: true,
        loading: false,
      };

    case types.STRAPI_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        sendResetLink: true,
        loading: false,
      };

    case types.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        sendResetLink: false,
        loading: false,
      };

    case types.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.TWITTER_LOGIN_SUCCESS:
    case types.FACEBOOK_LOGIN_SUCCESS:
    case types.APPLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case types.GOOGLE_LOGIN_START:
    case types.TWITTER_LOGIN_START:
    case types.FACEBOOK_LOGIN_START:
    case types.APPLE_LOGIN_START:
      return {
        ...state,
        loading: false,
      };

    case types.SET_USER:
      return {
        ...state,
        sendResetLink: false,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
