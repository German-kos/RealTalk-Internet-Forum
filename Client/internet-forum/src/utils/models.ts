import { StringLiteral } from "typescript";

// an interface for the sign-in form.
export interface SignInInterface {
  username: string;
  password: string;
}
//
// export interface SignUpInterface {
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }
//
export interface ProcessResult {
  usernameIsOkay: boolean;
  passwordIsOkay: boolean;
  resultMessageUsername: string;
  resultMessagePassword: string;
}
//
export interface FormErrorInterface {
  usernameError: string;
  passwordError: string;
}
// interface for error handler state in the sign up form component
export interface SignUpFormError {
  error: boolean;
  errorMsg?: string;
}
// interface for the sign up form target.value
export interface SignUpInterface {
  username: { value: string };
  password: { value: string };
  email: { value: string };
  firstName: { value: string };
  lastName: { value: string };
}
// interface for a collection of hooks, for the error handlers in the sign up form
export interface AggragatedSignUpHooksInterface {
  setUsernameError: React.Dispatch<React.SetStateAction<SignUpFormError>>;
  setEmailError: React.Dispatch<React.SetStateAction<SignUpFormError>>;
  setPasswordError: React.Dispatch<React.SetStateAction<SignUpFormError>>;
  setFirstNameError: React.Dispatch<React.SetStateAction<SignUpFormError>>;
  setLastNameError: React.Dispatch<React.SetStateAction<SignUpFormError>>;
}
// process result interface for the processSignUpForm helper function
export interface IProcessSignUpResult {
  haltSignUp: boolean;
}
