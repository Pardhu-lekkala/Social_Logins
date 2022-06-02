import React from "react";
import "./login.css";
import "../../../global.css";
import GoogleIcon from "../../../Assets/Google.png";
import TwitterIcon from "../../../Assets/twit.png";
import FacebookIcon from "../../../Assets/fb.png";
import AppleIcon from "../../../Assets/True.png";
import messageBox from "../../../Assets/messageBox.png";
import topEllipse from "../../../Assets/topEllipse.png";
import bottomEllipse from "../../../Assets/bottomEllipse.png";
import correctIcon from "../../../Assets/correctIcon.png";
import brandLogo from "../../../Assets/logo.png";
import logo from "../../../Assets/recta.png";
import { useNavigate } from "react-router";
import APPLICATION_CONSTANTS from "../../../Components/constantStrings";
import { useEffect } from "react";
import { useState } from "react";
import LinkedInPage from "../../../Components/LinkedIn";
import { auth } from "../../../firebase";
import {
  appleLoginInitiate,
  facebookLoginInitiate,
  googleLoginInitiate,
  loginInitiate,
  socialLogins,
  StrapiLoginInitiate,
  twitterLoginInitiate,
} from "../../../redux/action";
import { setPersistence } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../redux/store";
import Loader from "react-loader-spinner";

const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
    loginType: "firebase",
    buttonClick: true,
  });

  console.log(store.getState(), "store in login");
  const { email, password, buttonClick, loginType } = state;
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  console.log(currentUser, loading, "states in login");
  console.log(loginType, "login type");

  const navigateToSignup = () => {
    navigation("/signup");
  };

  const navigateToForgot = () => {
    navigation("/forgotPassword", {
      state: {
        forgotType: loginType,
      },
    });
  };

  useEffect(() => {
    if (email === "" || password === "") {
      setState({ ...state, buttonClick: false });
    }
  }, [currentUser, navigation, email, password]);

  const loginWithEmailAndPassword = () => {
    setState({ ...state, buttonClick: true });
    if (email && password !== "" && loginType === "firebase") {
      dispatch(loginInitiate(email, password));
      setState({ ...state, email: "", password: "" });
    }
    if (email && password !== "" && loginType === "strapi") {
      dispatch(StrapiLoginInitiate(email, password));
      setState({ ...state, email: "", password: "" });
    }
  };

  // const socialLoginsPasser = (provider) => {
  //   dispatch(socialLogins(provider));
  // };

  const googleLogin = () => {
    dispatch(googleLoginInitiate());
  };

  const facebookLogin = () => {
    dispatch(facebookLoginInitiate());
  };

  const appleLogin = () => {
    // dispatch(appleLoginInitiate());
  };

  const twitterLogin = () => {
    dispatch(twitterLoginInitiate());
  };

  return (
    <div className="login-main-cont">
      <div className="sign-up-cont">
        <div className="sign-logo-cont">
          <div className="top-logo-cont">
            <img src={brandLogo} style={{ height: 100, width: 100 }} />
          </div>
          <div className="top-header-cont">
            <img src={logo} />
            {/* <h1>Brand Name</h1> */}
          </div>
        </div>
        <div className="details-card-cont">
          <div className="input-cont">
            <label
              htmlFor="email"
              className="label-type"
              style={{ marginTop: "10%" }}
            >
              Email Address
            </label>
            <input
              type="text"
              className="input-text-styles"
              autocomplete="nope"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              required
            />
          </div>
          <div className="input-cont">
            <label
              htmlFor="password"
              className="label-type"
              style={{ marginTop: "3%" }}
            >
              Password
            </label>

            <input
              type="password"
              autocomplete="new-password"
              className="input-text-styles"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              required
            />

            <span className="label-type pass-cont" onClick={navigateToForgot}>
              Forgot Password
            </span>
          </div>
          {/* <div className="pass-cont" onClick={navigateToForgot}> */}

          {/* </div> */}
          <div style={{ marginRight: "2%", marginLeft: "5%" }}>
            <button className="sign-button" onClick={loginWithEmailAndPassword}>
              {loading === false ? (
                "Login"
              ) : (
                <Loader
                  type="TailSpin"
                  color="#fc031c"
                  height={30}
                  width={30}
                  visible={true}
                />
              )}
            </button>
          </div>
          <div
            onChange={(e) => setState({ ...state, loginType: e.target.value })}
          >
            <div className="radio-btn-cont">
              <div className="global-flex">
                <input
                  type="radio"
                  checked={loginType === "firebase"}
                  value="firebase"
                  //className="radio-inp-style"
                  style={{ height: "20px", width: "30px", cursor: "pointer" }}
                />
                <span style={{ marginTop: "2%" }}>Login with firebase</span>
              </div>
              <div className="global-flex">
                <input
                  type="radio"
                  checked={loginType === "strapi"}
                  value="strapi"
                  //className="radio-inp-style"
                  style={{ height: "20px", width: "30px", cursor: "pointer" }}
                />{" "}
                <span style={{ marginTop: "2%" }}>Login with strapi</span>
              </div>
            </div>
          </div>

          {email === "" && password === "" && buttonClick === true && (
            <p className="error-message-text">
              {APPLICATION_CONSTANTS.ERROR_EMAIL_STRING}
            </p>
          )}
          {email === "" && password !== "" && buttonClick === true && (
            <p className="error-message-text">
              {APPLICATION_CONSTANTS.ERROR_EMAIL_STRING}
            </p>
          )}
          {password === "" && email !== "" && buttonClick === true && (
            <p className="error-message-text">
              {APPLICATION_CONSTANTS.ERROR_PASSWORD_STRING}
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexBasis: "row",
              justifyContent: "flex-start",
            }}
          >
            <hr style={{ width: "32%", height: "1px", marginTop: "4%" }} />
            <span className="span-or">or</span>
            <hr style={{ width: "32%", height: "1px", marginTop: "4%" }} />
          </div>
          <div className="social-buttons" style={{ marginTop: "15px" }}>
            {process.env.React_App_Google_Login === "true" && (
              <button
                className="btn-1"
                style={{ background: "#EA4335", marginRight: "15px" }}
                onClick={googleLogin}
                //onClick={socialLoginsPasser(new GoogleAuthProvider())}
              >
                <img src={GoogleIcon} style={{ marginRight: "15px" }} />
                <p>Google</p>
              </button>
            )}
            {process.env.React_App_Facebook_Login === "true" && (
              <button
                className="btn-1"
                style={{ backgroundColor: "#1877F2" }}
                onClick={facebookLogin}
                //onClick={socialLoginsPasser(new FacebookAuthProvider())}
              >
                <img src={FacebookIcon} style={{ marginRight: "15px" }} />
                <p>Facebook</p>
              </button>
            )}
          </div>
          <div
            className="social-buttons"
            style={{ marginTop: "10px" }}
            onClick={appleLogin}
            //onClick={socialLoginsPasser(new OAuthProvider())}
          >
            {process.env.React_App_Apple_Login === "true" && (
              <button
                className="btn-1"
                style={{ background: "#000000", marginRight: "15px" }}
              >
                <img src={AppleIcon} style={{ marginRight: "15px" }} />
                <p>Apple</p>
                {/* <LinkedInPage /> */}
              </button>
            )}
            {process.env.React_App_Twitter_Login === "true" && (
              <button
                className="btn-1"
                style={{ backgroundColor: "#1D9BF0" }}
                onClick={twitterLogin}
                //onClick={socialLoginsPasser(new TwitterAuthProvider())}
              >
                <img src={TwitterIcon} style={{ marginRight: "15px" }} />
                <p>Twitter</p>
              </button>
            )}
          </div>
          <div>
            <p className="foot-para">
              Don’t have an account?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={navigateToSignup}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="adds-cont">
        <div className="topEllipse-cont">
          <img src={topEllipse} />
        </div>
        <div className="messageBox-cont">
          <img src={messageBox} />
        </div>
        <div className="bottomEllipse-cont">
          <img src={bottomEllipse} />
        </div>
      </div>
    </div>
  );
};

export default Login;
