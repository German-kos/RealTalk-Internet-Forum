import React, { useEffect, useState } from "react";
import "components/signup-form/signupform.css";
import {
  AggragatedSignUpHooksInterface,
  SignUpFormError,
  SignUpInterface,
} from "utils/models";
import { useNavigate } from "react-router-dom";
// import { processSignUpForm } from "utils/helpers";
import { processSignUpForm, setError } from "./helper";
// import { inputChangeHandler } from "./helper";
//
export default function SignUpForm() {
  // router navigate hook
  const navigate = useNavigate();

  // the default sate of the error handling states
  const defaultErrorState: SignUpFormError = {
    error: false,
    errorMsg: "",
  };

  // state for handling errors in the sign up form, one for each field.
  // (username, email, password, first name, last name)
  const [usernameError, setUsernameError] =
    useState<SignUpFormError>(defaultErrorState);

  const [emailError, setEmailError] =
    useState<SignUpFormError>(defaultErrorState);

  const [passwordError, setPasswordError] =
    useState<SignUpFormError>(defaultErrorState);

  const [firstNameError, setFirstNameError] =
    useState<SignUpFormError>(defaultErrorState);

  const [lastNameError, setLastNameError] =
    useState<SignUpFormError>(defaultErrorState);

  const aggragatedSignUpHooks: AggragatedSignUpHooksInterface = {
    setUsernameError: setUsernameError,
    setEmailError: setEmailError,
    setPasswordError: setPasswordError,
    setFirstNameError: setFirstNameError,
    setLastNameError: setLastNameError,
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & SignUpInterface;
    processSignUpForm(target, aggragatedSignUpHooks);
  };

  //
  const navToSignIn = () => navigate("/signin");
  //
  return (
    <div className="sign-up_flex_container">
      <div className="sign-up_form_container">
        <form className="sign-up_form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>USERNAME</label>
            <input
              onChange={(e) =>
                setError(e, setUsernameError, defaultErrorState, usernameError)
              }
              className={
                usernameError.error ? "sign-up_form_highlight_field" : undefined
              }
              type="usermname"
              name="username"
            />
            {usernameError.error && (
              <div className="sign-up_form_error">{usernameError.errorMsg}</div>
            )}
          </div>

          <div>
            <label>EMAIL</label>
            <input
              onChange={(e) =>
                setError(e, setEmailError, defaultErrorState, emailError)
              }
              className={
                emailError.error ? "sign-up_form_highlight_field" : undefined
              }
              name="email"
            />
            {emailError.error && (
              <div className="sign-up_form_error">{emailError.errorMsg}</div>
            )}
          </div>

          <div>
            <label>PASSWORD</label>
            <input
              onChange={(e) =>
                setError(e, setPasswordError, defaultErrorState, passwordError)
              }
              className={
                passwordError.error ? "sign-up_form_highlight_field" : undefined
              }
              type="password"
              name="password"
            />
            {passwordError.error && (
              <div className="sign-up_form_error">{passwordError.errorMsg}</div>
            )}
          </div>

          <div>
            <label>FIRST NAME</label>
            <input
              onChange={(e) =>
                setError(
                  e,
                  setFirstNameError,
                  defaultErrorState,
                  firstNameError
                )
              }
              className={
                firstNameError.error
                  ? "sign-up_form_highlight_field"
                  : undefined
              }
              type="firstName"
              name="firstName"
            />
            {firstNameError.error && (
              <div className="sign-up_form_error">
                {firstNameError.errorMsg}
              </div>
            )}
          </div>

          <div>
            <label>LAST NAME</label>
            <input
              onChange={(e) =>
                setError(e, setLastNameError, defaultErrorState, lastNameError)
              }
              className={
                lastNameError.error ? "sign-up_form_highlight_field" : undefined
              }
              type="lastName"
              name="lastName"
            />
            {lastNameError.error && (
              <div className="sign-up_form_error">{lastNameError.errorMsg}</div>
            )}
          </div>

          <div>
            <button type="submit">SIGN UP</button>
          </div>

          <div className="sign-in_form_already-a-member">
            <p>Already a member?</p>
            <a onClick={navToSignIn}>Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
}
