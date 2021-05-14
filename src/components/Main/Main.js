import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Main.css";

import DisplayTasks from "../DisplayTasks/DisplayTasks";
import NewTask from "../NewTask/NewTask";
import { fetchUserDetails } from "../../store/actions/user-action";

const Main = () => {
  const [isNewTask, setIsNewTask] = useState(false);
  const [isUpdateTask, setIsUpdateTask] = useState("");

  const tasks = useSelector((state) => state.task.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  return (
    <div className="container">
      <div className="task-container">
        <div
          className="header"
          style={
            tasks.length || isNewTask > 0
              ? { borderBottomWidth: 1, borderBottomColor: "#c0c3c4" }
              : { borderBottomWidth: 0 }
          }
        >
          <h3>
            TASKS <span>{tasks.length}</span>
          </h3>
          <div
            className="header-icon"
            onClick={() => {
              setIsNewTask(!isNewTask);
              setIsUpdateTask("");
            }}
          >
            <i className={isNewTask ? "bx bx-x" : "bx bx-plus"}></i>
          </div>
        </div>
        <div>
          {isNewTask ? (
            <NewTask
              onCancel={() => {
                setIsNewTask(false);
                setIsUpdateTask("");
              }}
              isUpdateTask={isUpdateTask}
            />
          ) : (
            <DisplayTasks
              editTaskHandler={(taskId) => {
                setIsNewTask(true);
                setIsUpdateTask(taskId);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
