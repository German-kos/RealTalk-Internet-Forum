import axios from "axios";
import {
  AggragatedSignUpHooksInterface,
  IProcessSignUpResult,
  ProcessResult,
  SignInInterface,
  SignUpFormError,
  SignUpInterface,
} from "./models";
import { validUsername } from "./regex";
//

//
export const processSignInForm = (username: string, password: string) => {
  const processResult: ProcessResult = {
    usernameIsOkay: false,
    passwordIsOkay: false,
    resultMessageUsername: "",
    resultMessagePassword: "",
  };
  if (username.trim().length !== username.length) {
    processResult.resultMessageUsername =
      "Invalid username, please avoid spaces in the username.";
  }
  if (!validUsername.test(username)) {
    if (processResult.resultMessageUsername !== "")
      processResult.resultMessageUsername =
        "Invalid username, please avoid spaces and special characters in the username.";
    else
      processResult.resultMessageUsername =
        "Invalid username, please avoid special characters in the username.";
  }
  if (password.trim().length === 0)
    processResult.resultMessagePassword = "Required field.";
  if (processResult.resultMessageUsername === "")
    processResult.usernameIsOkay = true;
  if (processResult.resultMessagePassword === "")
    processResult.passwordIsOkay = true;
  return processResult;
};

// a helper function to process the sign up form, and check for any errors in it's fields.
export const processSignUpForm = (
  target: SignUpInterface,
  signUpHooks: AggragatedSignUpHooksInterface
): IProcessSignUpResult => {
  // the default value of processResult, will change if there are any errors in the sign up form
  // to stop the sign up request, and ask the user to refill the form
  const processResult: IProcessSignUpResult = { haltSignUp: false };
  // a required field error for the error state hooks
  const requiredFieldError: SignUpFormError = {
    error: true,
    errorMsg: "Required Field",
  };
  // tests for if the field are empty
  if (target.username.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setUsernameError(requiredFieldError);
  }

  if (target.email.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setEmailError(requiredFieldError);
  }

  if (target.password.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setPasswordError(requiredFieldError);
  }

  if (target.firstName.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setFirstNameError(requiredFieldError);
  }

  if (target.lastName.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setLastNameError(requiredFieldError);
  }
  return processResult;
};
