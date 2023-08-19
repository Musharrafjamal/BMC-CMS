import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import './tasks.css'

const ShowTasks = () => {
  return (
    <div className="show-task-container scale-up-bl">
      <h2>Task List</h2>
      <ul className="new-task scale-up-bl">
        <li>Pay to employee</li>
        <button className="delete-task-btn">
          <AiOutlineDelete size={18} />
        </button>
      </ul>
    </div>
  );
};

export default ShowTasks;
