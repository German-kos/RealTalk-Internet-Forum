import React, { useState } from "react";
import "components/signup-form/signupform.css";
import { useForm } from "react-hook-form";
import {
  AggragatedSignUpHooksInterface,
  SignUpFormError,
  SignUpInterface,
} from "utils/models";
import { useNavigate } from "react-router-dom";
import { processSignUpForm } from "utils/helpers";
import { Action } from "@reduxjs/toolkit";
//
export default function SignUpForm() {
  const navigate = useNavigate();
  // the default sate of the error handling states
  const defaultErrorState: SignUpFormError = {
    error: false,
    errorMsg: "",
  };
  // state for handling errors in the sign up form, one for each field. (username, email, password, first name, last name)
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

  // aggragation of the error handling state setters
  const aggragatedSignUpHooks: AggragatedSignUpHooksInterface = {
    setUsernameError: setUsernameError,
    setEmailError: setEmailError,
    setPasswordError: setPasswordError,
    setFirstNameError: setFirstNameError,
    setLastNameError: setLastNameError,
  };

  // useForm hook, commented for testing
  //
  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors },
  // } = useForm<SignUpInterface>();

  // remove the useForm hook and instead make a function to check
  // whether the fields are empty or not.
  // if they are trigger a css class to make the input outlined
  // in red, and add a div with an error message.
  // if the fields are valid and the username and email are not taken
  // make an axios post request to register the account

  // useForm handleSubmit, commented for testing
  //
  // const submitSignUp = handleSubmit(async (data) => {
  //   console.log(data);
  // });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & SignUpInterface;
    processSignUpForm(target, aggragatedSignUpHooks);
    console.log(target.username.value);
    console.log(target.password.value);
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
              onChange={() => setUsernameError(defaultErrorState)}
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
              onChange={() => setEmailError(defaultErrorState)}
              className={
                emailError.error ? "sign-up_form_highlight_field" : undefined
              }
              type="email"
              name="email"
            />
            {emailError.error && (
              <div className="sign-up_form_error">{emailError.errorMsg}</div>
            )}
          </div>

          <div>
            <label>PASSWORD</label>
            <input
              onChange={() => setPasswordError(defaultErrorState)}
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
              onChange={() => setFirstNameError(defaultErrorState)}
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
              onChange={() => setLastNameError(defaultErrorState)}
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

        {/* <form className="sign-up_form" onSubmit={submitSignUp}>
          <div>
            <label>USERNAME</label>
            <input {...register("username", { required: true })} />
            {errors.username && (
              <div className="sign-up_form_error">This field is required</div>
            )}
          </div>
          <div>
            <label>EMAIL</label>
            <input {...register("email", { required: true })} />
            {errors.email && (
              <div className="sign-up_form_error">This field is required</div>
            )}
          </div>

          <div>
            <label>PASSWORD</label>
            <input {...register("password", { required: true })} />
            {errors.password && (
              <div className="sign-up_form_error">This field is required</div>
            )}
          </div>
          <div>
            <label>FIRST NAME</label>
            <input {...register("firstName", { required: true })} />
            {errors.firstName && (
              <div className="sign-up_form_error">This field is required</div>
            )}
          </div>
          <div>
            <label>LAST NAME</label>
            <input {...register("lastName", { required: true })} />
            {errors.lastName && (
              <div className="sign-up_form_error">This field is required</div>
            )}
          </div>
          <div>
            <button type="submit">SIGN UP</button>
          </div>
          <div className="sign-in_form_already-a-member">
            <p>Already a member?</p>
            <a onClick={navToSignIn}>Sign In</a>
          </div>
        </form> */}
      </div>
    </div>
  );
}
