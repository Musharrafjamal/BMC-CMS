import React from "react";
import "./Navbars/nav.css";
import { Link } from "react-router-dom";

const Button = ({ title, destination, OnClick }) => {
  return (
    <>
      <Link to={destination} className="scale-up-bl nav-btns" onClick={OnClick}> 
        {title}
      </Link>
    </>
  );
};

export default Button;
