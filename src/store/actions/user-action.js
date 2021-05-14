import axios from "axios";
import constants from "../../utilities/constants/constants";

import { USER } from "../action-creator";

export const fetchUserDetails = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://stage.api.sloovi.com/user", {
        headers: {
          Authorization: "Bearer " + constants.accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: USER, payload: data.results });
    } catch (error) {
      alert("Something went wrong");
    }
  };
};
