import React from "react";
import { BiRocket } from "react-icons/bi";
import "./TaskInput.css";

const TaskInput = () => {
  return (
    <div className="task-input-container">
      <input
        type="text"
        placeholder="Add a task..."
        className="scale-up-bottom"
      />
      <button className="scale-up-bl add-task-btn">
        <BiRocket size={40} color="white" />
      </button>
    </div>
  );
};

export default TaskInput;
