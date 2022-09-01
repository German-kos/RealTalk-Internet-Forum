import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

// The interface for the logged in user.
export interface UserState {
  id?: number;
  UserName?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Token?: string;
}
// The initial state for the logged in user.
// The user starts as logged off, so the initial state is undefined.
const initialState: UserState = {
  id: undefined,
  UserName: undefined,
  FirstName: undefined,
  LastName: undefined,
  Email: undefined,
  Token: undefined,
};
// userSlice is the handler for the sign in and sign out actions
export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.UserName = action.payload.UserName;
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.Email = action.payload.Email;
      state.Token = action.payload.Token;
    },
    signOut: (state) => {
      state.id = undefined;
      state.UserName = undefined;
      state.FirstName = undefined;
      state.LastName = undefined;
      state.Email = undefined;
      state.Token = undefined;
    },
  },
});
//
export const { signIn, signOut } = userSlice.actions;
//
export const SelectUser = (state: RootState) => state.rootReducer.user;
//
export default userSlice.reducer;
