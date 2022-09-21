import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import Modal from "components/modal/Modal";

interface InitialState {
  open: boolean;
}

// initial state for the modal, set by default to false so to not show
// the modal when not necessary
const initialState: InitialState = { open: false };

export const modalSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const SelectModal = (state: RootState) => state.rootReducer.modal;

export default modalSlice.reducer;
