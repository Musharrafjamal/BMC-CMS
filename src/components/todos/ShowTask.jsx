import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "./tasks.css";

const ShowTasks = ({ tasks, onDeleteTask }) => {
  return (
    <div className="show-task-container scale-up-bl">
      <h2>Task List</h2>
      {tasks.map((task) => {
        return (
          <ul key={task.id} className="new-task scale-up-bl">
            <li>{task.task}</li>
            <button className="delete-task-btn" onClick={() => onDeleteTask(task.id)}>
              <AiOutlineDelete size={18} />
            </button>
          </ul>
        );
      })}
    </div>
  );
};

export default ShowTasks;
