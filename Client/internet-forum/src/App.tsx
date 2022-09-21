import "./App.css";
import Router from "router/Router";
import { useDispatch, useSelector } from "react-redux";
import { modalSlice, SelectModal, openModal } from "redux/slices/modalSlice";
import Modal from "components/modal/Modal";
import store from "redux/store";
import { useCallback } from "react";
import { SignInForm } from "components";

function App() {
  const modalState = useSelector(SelectModal);
  const dispatch = useDispatch();
  const dispatchOpen = useCallback(() => dispatch({ type: "openModal" }), []);
  return (
    <div className="gradient__bg">
      <Router />
      <button onClick={() => store.dispatch(openModal())}>aaaaazzzzz</button>
      <div>{modalState.toString()}</div>
      {modalState.open && (
        <Modal
          modalOpen={modalState}
          handleClose={modalSlice.actions.closeModal}
          component={<SignInForm />}
        />
      )}
    </div>
  );
}

export default App;
