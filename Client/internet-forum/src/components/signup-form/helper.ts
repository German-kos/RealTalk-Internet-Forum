import { current } from "@reduxjs/toolkit";
import {
  AggragatedSignUpHooksInterface,
  IProcessSignUpResult,
  SignUpFormError,
  SignUpInterface,
} from "utils/models";

// // change handler for the inputs
// export const inputChangeHandler = (
//   e: React.SyntheticEvent<HTMLInputElement>, // the event that invoked this handler (for signUpErrorHelper)
//   errorSetter: React.Dispatch<React.SetStateAction<SignUpFormError>>, // error state setter corelated to this field (for signUpErrorHelper)
//   newErrorState: SignUpFormError, // the desired state for the error (for signUpErrorHelper)
//   currentErrorState: SignUpFormError, // the current state of the error (for signUpErrorHelper)
//   input: string | undefined, // the value state of the input that invoked this handler (for removeWhiteSpace)
//   setInput: React.Dispatch<React.SetStateAction<string | undefined>> // the value setter of the event that invoked this handler (for removeWhiteSpace)
// ) => {
//   setInput;
//   removeWhiteSpaces(e, setInput);
//   signUpErrorHelper(e, errorSetter, newErrorState, currentErrorState);
// };

// // a function that handles whitespace prevention in input fields
// export const removeWhiteSpaces = (
//   //   input: string | undefined,
//   e: React.SyntheticEvent<HTMLInputElement>,
//   setInput: React.Dispatch<React.SetStateAction<string | undefined>>
// ) => {
//   const testInput: string | undefined = e.currentTarget.value?.replace(
//     /\s/g,
//     ""
//   );
//   console.log(e.currentTarget.value);
//   if (testInput !== e.currentTarget.value) {
//     console.log("here");
//     setInput(testInput);
//   }
// };

// a helper function to process the sign up form, and check for any errors in it's fields.
export const processSignUpForm = (
  target: SignUpInterface,
  signUpHooks: AggragatedSignUpHooksInterface
): IProcessSignUpResult => {
  // the default value of processResult, will change if there are any errors in the sign up form
  // to stop the sign up request, and ask the user to refill the form
  const processResult: IProcessSignUpResult = { haltSignUp: false };

  // regexes
  const usernameRegex = /[^A-Za-z0-9]+/;
  const englishRegex = /^[a-zA-Z]*$/g;
  // const englishRegex = /^[a-zA-Z\s]*$/g;
  const whitespaceRegex = /\s/;
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  // a required field error for the error state hooks
  const requiredFieldError: SignUpFormError = {
    error: true,
    errorMsg: "Required Field",
  };

  // an avoid spaces error for the error state hooks
  const whitespaceError: SignUpFormError = {
    error: true,
    errorMsg: "Spaces are not allowed",
  };

  // an only english allowed error for the error state hooks
  const englishOnly: SignUpFormError = {
    error: true,
    errorMsg: "Field must contains only english characters",
  };

  // tests for if the field are empty, checks for whitespaces, and english letters
  // *password test only checks for an empty field and a length over 8
  if (target.username.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setUsernameError(requiredFieldError);
  } else if (whitespaceRegex.test(target.username.value)) {
    signUpHooks.setUsernameError(whitespaceError);
  } else if (usernameRegex.test(target.username.value)) {
    signUpHooks.setUsernameError({
      error: true,
      errorMsg: "Only english and numbers are allowed",
    });
  }

  if (target.email.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setEmailError(requiredFieldError);
  } else if (!emailRegex.test(target.email.value)) {
    signUpHooks.setEmailError({
      error: true,
      errorMsg: "Not a valid email address",
    });
  }

  if (target.password.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setPasswordError(requiredFieldError);
  } else if (target.password.value.length < 8) {
    signUpHooks.setPasswordError({
      error: true,
      errorMsg: "Password must be at least 8 characters",
    });
  }

  // make a function out of this
  if (target.firstName.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setFirstNameError(requiredFieldError);
  } else if (target.firstName.value.match(englishRegex) === null) {
    signUpHooks.setFirstNameError(englishOnly);
  }

  if (target.lastName.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setLastNameError(requiredFieldError);
  } else if (target.lastName.value.match(englishRegex) === null) {
    signUpHooks.setLastNameError(englishOnly);
  }
  console.log(target.firstName.value.match(englishRegex));

  // console.log(target.lastName.value.length);
  // console.log(target.lastName.value);
  // console.log(!englishRegex.test(target.lastName.value));
  // console.log("first");
  // console.log(!englishRegex.test(target.lastName.value));
  // console.log(target.lastName.value);

  // if (target.lastName.value.trim().length === 0) {
  //   processResult.haltSignUp = true;
  //   signUpHooks.setLastNameError(requiredFieldError);
  // } else if (!englishRegex.test(target.lastName.value)) {
  //   console.log(target.lastName.value);
  //   signUpHooks.setLastNameError(englishOnly);
  // }
  return processResult;
};

// helper for setting state of the sign up errors
// this function checks if there's a need to re-set the state, so not to rerender the component
// on every onChange trigger
export const setError = (
  e: React.SyntheticEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<SignUpFormError>>,
  newErrorState: SignUpFormError,
  currentErrorState: SignUpFormError
): void => {
  if (currentErrorState.error) setter(newErrorState);
};
