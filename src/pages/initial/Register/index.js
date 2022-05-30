import React from "react";
import GoogleIcon from "../../../Assets/Google.png";
import TwitterIcon from "../../../Assets/twit.png";
import FacebookIcon from "../../../Assets/fb.png";
import AppleIcon from "../../../Assets/True.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APPLICATION_CONSTANTS from "../../../Components/constantStrings";
import { useEffect } from "react";
import {
  registerInitiate,
  StrapiRegisterInitiate,
} from "../../../redux/action";
import messageBox from "../../../Assets/messageBox.png";
import topEllipse from "../../../Assets/topEllipse.png";
import bottomEllipse from "../../../Assets/bottomEllipse.png";
import Loader from "react-loader-spinner";
import brandLogo from "../../../Assets/logo.png";
import logo from "../../../Assets/recta.png";
import "./register.css";

const Register = () => {
  const navigater = useNavigate();
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    registerType: "firebase",
    buttonClick: true,
  });

  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  console.log(currentUser, "current user");

  const dispatch = useDispatch();
  const { email, password, buttonClick, registerType, username } = state;
  console.log(email, "outside dispatch");
  console.log(registerType, "reg type");

  const userRegister = () => {
    setState({ ...state, buttonClick: true });
    console.log(email, password, "inside dispatch");
    if (email !== "" && password !== "" && registerType === "firebase") {
      dispatch(registerInitiate(email, password));
      setState({ ...state, email: "", password: "" });
    }
    if (email !== "" && password !== "" && registerType === "strapi") {
      dispatch(StrapiRegisterInitiate(email, username, password));
      setState({ ...state, email: "", password: "", username: "" });
    }
  };

  useEffect(() => {
    if (email === "" || password === "") {
      setState({ ...state, buttonClick: false });
    }
  }, [email, password]);

  const navigateToLogin = () => {
    navigater("/");
  };

  return (
    <div
      className={
        registerType === "firebase" ? "login-main-cont" : "reg-main-cont"
      }
    >
      <div className="sign-up-cont">
        <div className="sign-logo-cont">
          <div
            className="top-logo-cont"
            //style={{ height: "20%", width: "30%" }}
          >
            <img src={brandLogo} />
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
              Email address
            </label>
            <input
              type="text"
              className="input-text-styles"
              value={email}
              autocomplete="nope"
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          {registerType === "strapi" && (
            <div className="input-cont">
              <label
                htmlFor="username"
                className="label-type"
                style={{ marginTop: "3%" }}
              >
                Username
              </label>
              <input
                type="text"
                className="input-text-styles"
                value={username}
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
              />
            </div>
          )}
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
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <button className="sign-button" onClick={userRegister}>
              {loading === false ? (
                "Register"
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
            onChange={(e) =>
              setState({ ...state, registerType: e.target.value })
            }
          >
            <div className="radio-btn-cont">
              <div className="global-flex">
                <input
                  type="radio"
                  checked={registerType === "firebase"}
                  value="firebase"
                  style={{ height: "20px", width: "30px", cursor: "pointer" }}
                />
                <span style={{ marginTop: "2%" }}>Register with firebase</span>
              </div>
              <div className="global-flex">
                <input
                  type="radio"
                  checked={registerType === "strapi"}
                  value="strapi"
                  style={{ height: "20px", width: "30px", cursor: "pointer" }}
                />{" "}
                <span style={{ marginTop: "2%" }}>Register with strapi</span>
              </div>
            </div>
          </div>
          {email === "" && password === "" && buttonClick === true && (
            <p className="error-message-text">
              {APPLICATION_CONSTANTS.ERROR_EMAIL_STRING}
            </p>
          )}
          {password === "" && email !== "" && buttonClick === true && (
            <p className="error-message-text">
              {" "}
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
            <hr
              style={{
                width: "40%",
                height: "1px",
                marginTop: "3%",
              }}
            />
            <span className="span-or">or</span>
            <hr style={{ width: "40%", height: "1px", marginTop: "3%" }} />
          </div>
          <div className="social-buttons" style={{ marginTop: "12px" }}>
            <button
              className="btn-1"
              style={{ background: "#EA4335", marginRight: "15px" }}
            >
              <img src={GoogleIcon} style={{ marginRight: "15px" }} />
              <p>Google</p>
            </button>
            <button className="btn-1" style={{ backgroundColor: "#1877F2" }}>
              <img src={FacebookIcon} style={{ marginRight: "15px" }} />
              <p>Facebook</p>
            </button>
          </div>
          <div className="social-buttons" style={{ marginTop: "10px" }}>
            <button
              className="btn-1"
              style={{ background: "#000000", marginRight: "15px" }}
            >
              <img src={AppleIcon} style={{ marginRight: "15px" }} />
              <p>Apple</p>
            </button>
            <button className="btn-1" style={{ backgroundColor: "#1D9BF0" }}>
              <img src={TwitterIcon} style={{ marginRight: "15px" }} />
              <p>Twitter</p>
            </button>
          </div>
          <div>
            <p className="foot-para">
              Have have an account?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={navigateToLogin}
              >
                Login
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

export default Register;
