import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllTasksHandler } from "../../store/actions/task-action";

import "./DisplayTasks.css";

const DisplayTasks = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const tasks = useSelector((state) => state.task.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllTasksHandler())
      .then((_) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <p style={{textAlign: "center"}}>Loading...!</p>
  ) : (
    tasks.length > 0 && (
      <div className="display-container">
        {tasks.map((task, index) => {
          return (
            <div className="task-card" key={index}>
              <div className="task-card-details">
                <div>
                  <img src={task.user_icon} alt="Task Creator" />
                </div>
                <div>
                  <h4>{task.task_msg}</h4>
                  <p>{task.task_date}</p>
                </div>
              </div>
              <div
                className="btn-group"
                onClick={() => props.editTaskHandler(task.id)}
              >
                <i className="bx bxs-pencil"></i>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default DisplayTasks;
