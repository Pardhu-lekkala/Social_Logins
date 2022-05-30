import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../../../redux/action";
import { useNavigate } from "react-router";
import FirestoreData from "../../../Components/fireStoreData";
import Avvvatars from "avvvatars-react";
import signOut from "../../../Assets/sign-out.png";
import "./home.css";
import { useState } from "react";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const [dataType, setDataType] = useState("");
  const [clickType, setClickType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(dataType, "data type");

  const logOut = () => {
    console.log("logout called");
    if (currentUser) {
      dispatch(logoutInitiate());
    }
    navigate("/");
  };

  // useEffect(() => {
  //   if (currentUser === null) {
  //     navigate("/");
  //   }
  // }, [currentUser]);

  return (
    <div className="home-main-cont">
      <div className="home-cont">
        <header className="header-text">
          <div style={{ marginTop: "4%", marginRight: "2%" }}>
            <Avvvatars value={currentUser} size={40} />
          </div>
          <p style={{ color: "#ffffff" }}>{currentUser}</p>
        </header>
        {/* <h1>welcome {currentUser} to Home Page</h1> */}
        <div className="logout-cont" onClick={logOut}>
          <img src={signOut} className="logout-btn" />
        </div>
      </div>
      <div className="side-bar">
        <div className="side-bar-btn-cont">
          <button
            className={clickType !== "firebase" ? "side-btn" : "mod-btn"}
            onClick={() => {
              setClickType("firebase");
              setDataType("firebase");
            }}
          >
            Firebase Data
          </button>
          <button
            className={clickType !== "open" ? "side-btn" : "mod-btn"}
            onClick={() => {
              setClickType("open");
              setDataType("open");
            }}
          >
            Open Data
          </button>
        </div>
        <div className="home-content-cont">
          <div>
            <FirestoreData type={dataType} clickType={clickType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
