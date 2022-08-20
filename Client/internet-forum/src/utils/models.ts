import { StringLiteral } from "typescript";

// an interface for the sign-in form.
export interface SignInData {
  username: string;
  password: string;
}
//
export interface SignUpInterface {
  username: string;
  password: string;
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
