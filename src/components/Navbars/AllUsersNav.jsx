import React from "react";
import "./nav.css";
import LogOut from "../LogOut";
import { FiUserPlus } from "react-icons/fi";

const AllUsersNav = ({ userName, setOpendailog }) => {
  return (
    <nav>
      <div className="logo scale-up-bl">
        Book <span>my</span> Carrer
      </div>
      <div className="btns">
        <button
          className="scale-up-bl nav-btns"
          onClick={() => {
            setOpendailog(true);
          }}
        >
          {<FiUserPlus size={20} />}
        </button>
        <LogOut />
      </div>
      <div className="nav-profile scale-up-bl">
        <div className="name">{userName}</div>
      </div>
    </nav>
  );
};

export default AllUsersNav;
