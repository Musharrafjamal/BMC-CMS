import React from "react";
import { BiRocket } from "react-icons/bi";
import "./TaskInput.css";

const TaskInput = ({setTaskInput, onAddTask}) => {
  return (
    <div className="task-input-container">
      <input
        type="text"
        placeholder="Add a task..."
        className="scale-up-bottom"
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button className="scale-up-bl add-task-btn" onClick={onAddTask}>
        <BiRocket size={40} color="white" />
      </button>
    </div>
  );
};

export default TaskInput;
