import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import taskReducer from "./store/reducers/task-reducer";
import userReducer from "./store/reducers/user-reducer";
import Container from "./container/Container";

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
