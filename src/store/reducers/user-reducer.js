import { USER } from "../action-creator";

const initialState = {
  userDetails: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
