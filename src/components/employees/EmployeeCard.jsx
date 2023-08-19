import React from "react";
import "./EmployeeCard.css";

const EmployeeCard = ({ userList }) => {
  return (
    <>
      {userList.map((user) => {
        return (
          <div className="emp-profile scale-up-center" key={user.id}>
            <img src={user.imgUrl} alt="Employee" className="emp-img" />
            
            <div className="emp-info">
              <h1 className="name">{user.name}</h1>
              <p className="emp-phone">Password: {user.password}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EmployeeCard;
