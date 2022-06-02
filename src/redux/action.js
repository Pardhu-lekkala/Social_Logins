import * as types from "./actionTypes";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router";
import APPLICATION_CONSTANTS from "../Components/constantStrings";
import Swal from "sweetalert2";

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const starpiRegisterStart = () => ({
  type: types.STRAPI_REGISTER_START,
});

const strapiRegisterSuccess = (user) => ({
  type: types.STRAPI_REGISTER_SUCCESS,
  payload: user,
});

const strapiRegisterFail = (error) => ({
  type: types.STRAPI_REGISTER_FAIL,
  payload: error,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const starpiLoginStart = () => ({
  type: types.STRAPI_LOGIN_START,
});

const strapiLoginSuccess = (user) => ({
  type: types.STRAPI_LOGIN_SUCCESS,
  payload: user,
});

const strapiLoginFail = (error) => ({
  type: types.STRAPI_LOGIN_FAIL,
  payload: error,
});

const forgotPasswordStart = () => ({
  type: types.FORGOT_PASSWORD_START,
});

const forgotPasswordSuccess = (user) => ({
  type: types.FORGOT_PASSWORD_SUCCESS,
  payload: user,
});

const forgotPasswordFail = (error) => ({
  type: types.FORGOT_PASSWORD_FAIL,
  payload: error,
});

const strapiForgotPasswordStart = () => ({
  type: types.STRAPI_FORGOT_PASSWORD_START,
});

const strapiForgotPasswordSuccess = (user) => ({
  type: types.STRAPI_FORGOT_PASSWORD_SUCCESS,
  payload: user,
});

const strapiForgotPasswordFail = (error) => ({
  type: types.STRAPI_FORGOT_PASSWORD_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGIN_START,
});

const logoutSuccess = (user) => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

const googleLoginStart = () => ({
  type: types.GOOGLE_LOGIN_START,
});

const googleLoginSuccess = (user) => ({
  type: types.GOOGLE_LOGIN_SUCCESS,
  payload: user,
});

const googleLoginFail = (error) => ({
  type: types.GOOGLE_LOGIN_FAIL,
  payload: error,
});

const twitterLoginStart = () => ({
  type: types.TWITTER_LOGIN_START,
});

const twitterLoginSuccess = (user) => ({
  type: types.TWITTER_LOGIN_SUCCESS,
  payload: user,
});

const twitterLoginFail = (error) => ({
  type: types.TWITTER_LOGIN_FAIL,
  payload: error,
});

const facebookLoginStart = () => ({
  type: types.FACEBOOK_LOGIN_START,
});

const facebookLoginSuccess = (user) => ({
  type: types.FACEBOOK_LOGIN_SUCCESS,
  payload: user,
});

const facebookLoginFail = (error) => ({
  type: types.FACEBOOK_LOGIN_FAIL,
  payload: error,
});

const appleLoginStart = () => ({
  type: types.APPLE_LOGIN_START,
});

const appleLoginSuccess = (user) => ({
  type: types.APPLE_LOGIN_SUCCESS,
  payload: user,
});

const appleLoginFail = (error) => ({
  type: types.APPLE_LOGIN_FAIL,
  payload: error,
});

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const registerInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        sendEmailVerification(auth.currentUser);
        dispatch(registerSuccess(user.email));
        Swal.fire(
          "Success",
          `${APPLICATION_CONSTANTS.EMAIL_VERIFICATION_STRING}`,
          "success"
        );
        console.log(user.email, "user in action");
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
        Swal.fire("Error", `${error.message}`, "error");
        console.log(error.message, "err msg");
      });
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user.email));
        console.log(user.email, "user in action");
      })
      .catch((error) => {
        dispatch(loginFail(error.message));
        Swal.fire("Error", `${error.message}`, "error");
        console.log(error.message, "err msg");
      });
  };
};

export const StrapiRegisterInitiate = (email, username, password) => {
  console.log(email, username, password, "creds for strapi");
  return async function (dispatch) {
    dispatch(starpiRegisterStart());
    let result = await fetch(process.env.React_App_Strapi_Register_Api, {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.jwt !== undefined) {
      dispatch(strapiRegisterSuccess(result.user.email));
      Swal.fire(
        "Success",
        `${APPLICATION_CONSTANTS.STRAPI_SUCCESSFULL_REGISTER}`,
        "success"
      );
      console.log(result, "strapi reg res");
      console.log(result.user.email, "strapi email");
      return true;
    } else {
      dispatch(strapiRegisterFail(APPLICATION_CONSTANTS.STRAPI_REGISTER_ERROR));
      console.log(result, "strapi err");
      Swal.fire(
        "Error",
        `${APPLICATION_CONSTANTS.STRAPI_REGISTER_ERROR}`,
        "error"
      );
    }
  };
};

export const StrapiForgotPasswordInitiate = (email) => {
  console.log(email, "creds for strapi");
  return async function (dispatch) {
    dispatch(strapiForgotPasswordStart());
    let result = await fetch(
      "https://strapi.meta.eskoops.com/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();
    console.log(result, "result for forgot strapi");
    if (result["ok"] === true) {
      dispatch(strapiForgotPasswordSuccess());
      Swal.fire(
        "Success",
        `${APPLICATION_CONSTANTS.PASSWORD_RESET_STR}`,
        "success"
      );
    } else {
      dispatch(strapiForgotPasswordFail());
      Swal.fire(
        "ERROR",
        `${APPLICATION_CONSTANTS.INAVALID_EMAIL_STR}`,
        "error"
      );
    }
  };
};

export const StrapiLoginInitiate = (identifier, password) => {
  console.log(identifier, password, "creds for strapi");
  return async function (dispatch) {
    dispatch(starpiLoginStart());
    let result = await fetch(process.env.React_App_Strapi_Login_Api, {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.jwt !== undefined) {
      dispatch(strapiLoginSuccess(result.user.email));
      console.log(result, "strapi res");
      console.log(result.user.email, "strapi email");
      return true;
    } else {
      dispatch(strapiLoginFail(APPLICATION_CONSTANTS.STRAPI_REGISTER_ERROR));
      console.log(result, "strapi err");
      Swal.fire(
        "Error",
        `${APPLICATION_CONSTANTS.STRAPI_REGISTER_ERROR}`,
        "error"
      );
    }
  };
};

export const forgotPasswordInitiate = (email) => {
  return function (dispatch) {
    dispatch(forgotPasswordStart());
    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(forgotPasswordSuccess(email));
        Swal.fire(
          "Success",
          `${APPLICATION_CONSTANTS.PASSWORD_RESET_STR}`,
          "success"
        );
        console.log(email, "user in action");
      })
      .catch((error) => {
        dispatch(forgotPasswordFail(error.message));
        Swal.fire("Error", `${error.message}`, "error");
        console.log(error.message, "err msg");
      });
  };
};

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    signOut(auth)
      .then((res) => {
        //window.location.assign("https://accounts.google.com/logout");
        dispatch(logoutSuccess());
        console.log(res, "response for logout");
      })
      .catch((error) => {
        dispatch(logoutFail(error.message));
        Swal.fire("Error", `${error.message}`, "error");
        console.log(error.message, "err msg");
      });
  };
};

export const googleLoginInitiate = () => {
  return function (dispatch) {
    const provider = new GoogleAuthProvider();
    dispatch(googleLoginStart());
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        console.log(user, "user in action");
        dispatch(googleLoginSuccess(user.email));
      })
      .catch((error) => {
        dispatch(googleLoginFail(error.message));
        if (
          error.message !== "Firebase: Error (auth/cancelled-popup-request)."
        ) {
          Swal.fire("Error", `${error.message}google`, "error");
        }
        console.log(error.message, "err msg");
      });
  };
};

export const twitterLoginInitiate = () => {
  return function (dispatch) {
    dispatch(twitterLoginStart());
    const provider = new TwitterAuthProvider();
    // provider.setCustomParameters({
    //   prompt: "select_account",
    // });
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(twitterLoginSuccess(user.displayName));
        console.log(user.displayName, user, "user in action");
      })
      .catch((error) => {
        dispatch(twitterLoginFail(error.message));
        if (
          error.message !== "Firebase: Error (auth/cancelled-popup-request)."
        ) {
          Swal.fire("Error", `${error.message}`, "error");
        }
        console.log(error, "err msg");
      });
  };
};

export const facebookLoginInitiate = () => {
  return function (dispatch) {
    dispatch(facebookLoginStart());
    signInWithPopup(auth, new FacebookAuthProvider())
      .then(({ user }) => {
        dispatch(facebookLoginSuccess(user.displayName));
        console.log(user.displayName, user, "user in action");
      })
      .catch((error) => {
        dispatch(facebookLoginFail(error.message));
        if (
          error.message !== "Firebase: Error (auth/cancelled-popup-request)."
        ) {
          Swal.fire("Error", `${error.message}`, "error");
        }
        console.log(error.message, "err msg");
      });
  };
};

export const appleLoginInitiate = () => {
  return function (dispatch) {
    dispatch(appleLoginStart());
    signInWithPopup(auth, new OAuthProvider("apple.com"))
      .then(({ user }) => {
        dispatch(appleLoginSuccess(user.displayName));
        console.log(user.displayName, user, "user in action");
      })
      .catch((error) => {
        dispatch(appleLoginFail(error.message));
        if (
          error.message !== "Firebase: Error (auth/cancelled-popup-request)."
        ) {
          Swal.fire("Error", `${error.message}`, "error");
        }
        console.log(error.message, "err msg");
      });
  };
};

// export const socialLogins = (provider) => {
//   console.log(provider, "provider");
//   return function (dispatch) {
//     dispatch(appleLoginStart());
//     signInWithPopup(auth, new OAuthProvider("apple.com"))
//       .then(({ user }) => {
//         dispatch(appleLoginSuccess(user.displayName));
//         console.log(user.displayName, user, "user in action");
//       })
//       .catch((error) => {
//         dispatch(appleLoginFail(error.message));
//         Swal.fire("Error", `${error.message}`, "error");
//         console.log(error.message, "err msg");
//       });
//   };
// };
