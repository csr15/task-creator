import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import taskReducer from "./store/reducers/task-reducer";
import Main from "./components/Main/Main";
import userReducer from "./store/reducers/user-reducer";

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
