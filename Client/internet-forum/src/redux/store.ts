import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "redux/slices/counterSlice";
import userReducer from "redux/slices/UserSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});
const store = configureStore({
  reducer: {
    rootReducer,
  },
});
//
export type RootState = ReturnType<typeof store.getState>;
//
export type AppDispatch = typeof store.dispatch;
//
export default store;
