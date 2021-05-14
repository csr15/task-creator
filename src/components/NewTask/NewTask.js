import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  addNewTaskHandler,
  deleteTasksHandler,
  updatingTasksHandler,
} from "../../store/actions/task-action";

import "./NewTask.css";

const NewTask = (props) => {
  const [newTask, setNewtask] = useState({
    description: "",
    date: "",
    time: "",
    assignedPerson: "person1",
  });
  const [isLoading, setIsLoading] = useState(false);

  const state = useSelector((state) => {
    return {
      tasks: state.task.tasks,
      userDetails: state.user.userDetails,
    };
  });

  useEffect(() => {
    if (props.isUpdateTask) {
      let taskDetails = state.tasks.filter(
        (task, index) => task.id === props.isUpdateTask
      );

      let time = taskDetails[0].time_zone / 3600;
      let splitedTime = time.toString().split(".");
      let hour =
        splitedTime[0].length == 1 ? `0${splitedTime[0]}` : splitedTime[0];
      let min = splitedTime[1] == 5 ? "30" : "00";

      setNewtask({
        description: taskDetails[0].task_msg,
        date: taskDetails[0].task_date,
        time: `${hour}:${min}`,
      });
    }
  }, []);

  const dispatch = useDispatch();
  const saveNewTaskHandler = useCallback(() => {
    const { description, date, time, assignedPerson } = newTask;
    if (
      description !== "" &&
      date !== "" &&
      time !== "" &&
      assignedPerson !== ""
    ) {
      setIsLoading(true);
      let hours = +newTask.time.substr(0, 2);
      let min = +newTask.time.substr(3, 4);
      let updatedTime = hours * 3600 + min * 60;

      const newTaskData = {
        assigned_user: state.userDetails.id,
        task_date: date,
        task_time: 1620822600,
        is_completed: 0,
        time_zone: updatedTime,
        task_msg: description,
      };

      if (props.isUpdateTask) {
        dispatch(updatingTasksHandler(newTaskData, props.isUpdateTask))
          .then((_) => {
            setIsLoading(false);
            props.onCancel();
          })
          .catch((err) => console.log(err));
      } else {
        dispatch(addNewTaskHandler(newTaskData))
          .then((_) => {
            setIsLoading(false);
            props.onCancel();
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("Please fill all the fields to create new task");
    }
  }, [newTask]);

  const deleteTaskHandler = useCallback(() => {
    dispatch(deleteTasksHandler(props.isUpdateTask))
      .then((_) => {
        props.onCancel();
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="new-task">
      <form>
        <div className="form-control">
          <label className="label">Task Description</label>
          <input
            type="text"
            autoCorrect="off"
            value={newTask.description}
            onChange={(e) =>
              setNewtask({ ...newTask, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <div className="form-control">
            <label className="label">Date</label>
            <div className="form-icon date">
              <i className="bx bx-calendar"></i>
              <input
                type="date"
                id="date"
                autoCorrect="off"
                value={newTask.date}
                onChange={(e) =>
                  setNewtask({ ...newTask, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control select">
            <label className="label">Time</label>
            <div className="form-icon">
              <i className="bx bxs-time"></i>
              <select
                id="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewtask({ ...newTask, time: e.target.value })
                }
              >
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-control">
          <label className="label">Assign User</label>
          <select
            className="select"
            id="persons"
            value={newTask.assignedPerson}
            onChange={(e) =>
              setNewtask({ ...newTask, assignedPerson: e.target.value })
            }
          >
            <option value="Saravanan 23 Testing">Saravanan 23 Testing</option>
          </select>
        </div>
      </form>
      <div className="form-buttons">
        <div className="trash">
          {props.isUpdateTask !== "" && (
            <i
              className="bx bxs-trash"
              onClick={deleteTaskHandler.bind(this, props.isUpdateTask)}
            ></i>
          )}
        </div>
        <div>
          <button className="btn btn-secondary" onClick={props.onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={isLoading ? { opacity: 0.5 } : { opacity: 1 }}
            disabled={isLoading}
            onClick={saveNewTaskHandler}
          >
            {isLoading ? "Saving.." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;



