import {
  Action,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { RootState } from "redux/store";
//
interface CounterState {
  value: number;
}
//
const initialState: CounterState = {
  value: 0,
};
//
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
//
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
//
export const incrementAsync = (amount: number) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
//
export const SelectCount = (state: RootState) =>
  state.rootReducer.counter.value;
//
export default counterSlice.reducer;
