import React from "react";
import "./nav.css";
import Button from "../Button";
// import profilePic from "./img4.png";
import LogOut from "../LogOut";

const Nav = ({userName}) => {
  return (
    <nav>
      <div className="logo scale-up-bl">
        Book <span>my</span> Carrer
      </div>
      <div className="btns">
        <Button title={'Users'} destination={"/users"} />
        <Button title={"Employees"} destination={"/employees"} />
        <LogOut />
      </div>
      <div className="nav-profile scale-up-bl">
        <div className="name">{userName}</div>
        {/* <div className="img">
          <img src={profilePic} alt="Profile pic" />
        </div> */}
      </div>
    </nav>
  );
};

export default Nav;
