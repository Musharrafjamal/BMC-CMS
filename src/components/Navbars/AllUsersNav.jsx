import React, { useEffect, useState } from "react";
import "./nav.css";
import LogOut from "../LogOut";
import { FiUserPlus } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

const AllUsersNav = ({ userName, setOpendailog, setTaskDailog }) => {
  const [btnDisable, setBtnDisable] = useState(false)
  useEffect(() => {
    if(userName === process.env.REACT_APP_ADMIN_EMAIL){
      setBtnDisable(true)
    }
  }, [btnDisable, userName])
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
        <button
          className="scale-up-bl nav-btns"
          onClick={() => {
            setTaskDailog(true);
          }}
          disabled={btnDisable}
        >
          {<FaTasks size={20} />}
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
