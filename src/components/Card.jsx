import React from "react";
import "./Card.css";

const Card = ({ icon, content, countings, currency }) => {
  return (
    <div className="dash-card scale-up-bl">
      <div>{icon}</div>
      <h3>{content}</h3>
      <div className="countings">
        {currency && <span>&#8377;</span>}
        {countings}
      </div>
    </div>
  );
};

export default Card;
