import React from "react";
import "./Table.css";
import { FiUserMinus, FiUserCheck } from "react-icons/fi";

const Table = ({ listOfUsers, onDeleteUser, passingUserId, setOpenDailog }) => {
  return (
    <div className="table-container">
      <table>
        <caption>User details</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone number</th>
            <th>E_mail Id</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((user, index) => {
            return (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.date}</td>
                <td>
                  <button
                    className="delete-task-btn"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    {<FiUserMinus size={18} />}
                  </button>
                  <button
                    className="update-task-btn"
                    onClick={() => {
                      setOpenDailog(true);
                      passingUserId(user.id);
                    }}
                  >
                    {<FiUserCheck size={18} />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
