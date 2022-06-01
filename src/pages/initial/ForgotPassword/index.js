import React from "react";
import "./forgot.css";
import { useNavigate } from "react-router";
import flyVector from "../../../Assets/flyVector2.png";
import logo from "../../../Assets/recta.png";
import brandLogo from "../../../Assets/logo.png";
import messageBox from "../../../Assets/messageBox.png";
import topEllipse from "../../../Assets/topEllipse.png";
import bottomEllipse from "../../../Assets/bottomEllipse.png";
import { useState } from "react";
import {
  forgotPasswordInitiate,
  StrapiForgotPasswordInitiate,
} from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import "../../../global.css";
import { useEffect } from "react";
import Loader from "react-loader-spinner";

const ForgotPassword = (props) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    buttonClick: false,
    forgotType: "firebase",
  });

  const { email, buttonClick, forgotType } = state;
  const { loading } = useSelector((state) => state.user);
  console.log(forgotType, "forgot type");

  useEffect(() => {
    if (email !== "") {
      setState({ ...state, buttonClick: false });
    }
  }, [email]);

  const navigateSignIn = () => {
    navigation("/");
  };

  const forgotPassword = () => {
    setState({ ...state, buttonClick: true });
    if (email !== "" && forgotType === "firebase") {
      dispatch(forgotPasswordInitiate(email));
      setState({ ...state, email: "" });
    }
    if (email !== "" && forgotType === "strapi") {
      console.log("dispatch strapi");
      dispatch(StrapiForgotPasswordInitiate(email));
      setState({ ...state, email: "" });
    }
  };

  return (
    <div className="login-main-cont">
      <div className="sign-up-cont">
        <div className="sign-logo-cont">
          <div className="top-logo-cont" style={{ marginTop: "80%" }}>
            <img src={brandLogo} style={{ height: 100, width: 100 }} />
          </div>
          <div className="top-header-cont">
            <img src={logo} />
          </div>
        </div>
        <div className="arrow-img-cont">
          <img src={flyVector} className="image" />
        </div>
        <div className="forgot-card-cont">
          <div className="forgot-content-cont">
            <h1 className="head-class">Forgot password</h1>
            <p className="content-class">
              Forgot your password? No worries. Provide your login email address
              and we will send you a password reset link to your email address.
            </p>
          </div>
          <div className="input-cont" style={{ marginLeft: "10%" }}>
            <label
              htmlFor="email"
              className="label-type"
              style={{ marginTop: "10%" }}
            >
              Mail ID
            </label>
            <input
              type="text"
              className="input-text-styles"
              value={email}
              autoComplete={false}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>

          <div style={{ marginTop: "15px", marginBottom: "10px" }}>
            <button className="reset-button" onClick={forgotPassword}>
              {loading === false ? (
                "Send reset link"
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
            onChange={(e) => setState({ ...state, forgotType: e.target.value })}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div className="radio-btn-cont">
              <div className="global-flex">
                <input
                  type="radio"
                  checked={forgotType === "firebase"}
                  value="firebase"
                  //className="radio-inp-style"
                  style={{ height: "20px", width: "30px", cursor: "pointer" }}
                />
                <span style={{ marginTop: "2%" }}>Forgot for Firebase</span>
              </div>
              <div className="global-flex">
                <input
                  type="radio"
                  checked={forgotType === "strapi"}
                  value="strapi"
                  //className="radio-inp-style"
                  style={{ height: "20px", width: "30px", cursor: "pointer" }}
                />{" "}
                <span style={{ marginTop: "2%" }}>Forgot for Strapi</span>
              </div>
            </div>
          </div>
          {email === "" && buttonClick === true && (
            <p className="error-message-text">*please Enter Email</p>
          )}

          <div
            onClick={navigateSignIn}
            style={{ cursor: "pointer", textDecoration: "underLine" }}
          >
            <p className="foot-para">Back to Login</p>
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

export default ForgotPassword;
