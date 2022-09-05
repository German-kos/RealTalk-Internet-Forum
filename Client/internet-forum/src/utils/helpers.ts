// imports
import {
  AggragatedSignUpHooksInterface,
  IProcessSignUpResult,
  ProcessResult,
  SignUpFormError,
  SignUpInterface,
} from "./models";
import { validUsername } from "./regex";
// helper functions
//
// remake this function based on the 'processSignUpForm' function
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
