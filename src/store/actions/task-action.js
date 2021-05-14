import axios from "axios";
import constants from "../../utilities/constants/constants";

import { TASKS } from "../action-creator";

export const getAllTasksHandler = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598",
        {
          headers: {
            Authorization: "Bearer " + constants.accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: TASKS, payload: data.results });
    } catch (error) {
      alert("Soemething went wrong! on fetching tasks");
    }
  };
};

export const addNewTaskHandler = (taskData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598",
        {
          ...taskData,
        },
        {
          headers: {
            Authorization: "Bearer " + constants.accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: TASKS, payload: data.results });
    } catch (error) {
      alert("Soemething went wrong! on adding new task");
    }
  };
};

export const updatingTasksHandler = (taskData, taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${taskId}`,
        {
          ...taskData,
        },
        {
          headers: {
            Authorization: "Bearer " + constants.accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: TASKS, payload: data.results });
    } catch (error) {
      alert("Soemething went wrong! on updating task");
    }
  };
};

export const deleteTasksHandler = (taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${taskId}`,
        {
          headers: {
            Authorization: "Bearer " + constants.accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: TASKS, payload: data.results });
    } catch (error) {
      alert("Soemething went wrong! on deleting tasks");
    }
  };
};
