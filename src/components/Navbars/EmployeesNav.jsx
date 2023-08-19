import React from "react";
import "./nav.css";
import Button from "../Button";
import LogOut from "../LogOut";
import { FiUserPlus } from "react-icons/fi";

const EmployeesNav = ({ userName, onClick }) => {
  return (
    <nav>
      <div className="logo scale-up-bl">
        Book <span>my</span> Carrer
      </div>
      <div className="btns">
        <Button title={<FiUserPlus size={20} />} destination={null} OnClick={onClick} />
        <LogOut />
      </div>
      <div className="nav-profile scale-up-bl">
        <div className="name">{userName}</div>
      </div>
    </nav>
  );
};

export default EmployeesNav;
