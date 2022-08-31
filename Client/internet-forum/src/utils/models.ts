import { StringLiteral } from "typescript";

// an interface for the sign-in form.
export interface SignInInterface {
  username: string;
  password: string;
}
//
export interface SignUpInterface {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
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
