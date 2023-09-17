import "./UserToDo.css";
import { GiCrossMark } from "react-icons/gi";
import { BsRocketTakeoff } from "react-icons/bs";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const UserToDo = ({
  closeDailog,
  setUserTaskText,
  onAddingTask,
  userTaskList,
  getTasks,
  onDeleteTask,
}) => {
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  const sortedTaskList = [...userTaskList].sort((a, b) => a.index - b.index);

  return (
    <div className="user-todo-container">
      <div className="user-todo-subcontainer">
        <h1>Task List</h1>
        <ul>
          {sortedTaskList.map((task, index) => {
            return (
              <div className="user-task" key={index}>
                <li>
                  <span>{index + 1}.</span> {task.task}
                </li>
                <button
                  className="delete-task-btn"
                  onClick={() => {
                    onDeleteTask(task.id);
                  }}
                >
                  <AiOutlineDelete size={14} />
                </button>
              </div>
            );
          })}
        </ul>
        <div className="user-todo-actions">
          <input
            type="text"
            placeholder="Add a task"
            onChange={(e) => {
              setUserTaskText(e.target.value);
            }}
          />
          <div className="user-todo-btns">
            <button
              onClick={() => {
                closeDailog(false);
              }}
              className="button-4"
            >
              <GiCrossMark size={25} color="red" />
            </button>
            <button className="button-4" onClick={onAddingTask}>
              <BsRocketTakeoff size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserToDo;
