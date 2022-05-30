import React from "react";
import { useEffect, useState } from "react";
import "./details.css";
import { useNavigate } from "react-router";

const DetailsScreen = (props) => {
  //const { navigation } = this.props;
  var bookDetails = localStorage.getItem("detailsObject");
  var parsedDetails = JSON.parse(bookDetails);
  const navigate = useNavigate();

  const goBack = () => {
    localStorage.removeItem("detailsObject");
    navigate("/home");
  };
  console.log(parsedDetails, "local details");
  console.log(parsedDetails.title, "title details");
  return (
    <div className="details-main-cont">
      <div className="card-detail-cont">
        <h1 className="head-data">{parsedDetails.title}</h1>
        <p className="para-data">{parsedDetails.author}</p>
        <p className="para-data">{parsedDetails.genre}</p>
        <p className="para-data">{parsedDetails.count}</p>
        {parsedDetails.country !== "" && (
          <p className="para-data">{parsedDetails.country}</p>
        )}
        {parsedDetails.capital !== "" && (
          <p className="para-data">{parsedDetails.capital}</p>
        )}
        {parsedDetails.organization !== "" && (
          <p className="para-data">{parsedDetails.organization}</p>
        )}
      </div>
      <div onClick={goBack}>
        <button className="detail-back-btn">Back</button>
      </div>
    </div>
  );
};

export default DetailsScreen;
