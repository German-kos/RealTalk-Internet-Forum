import axios from "axios";
import { SignInData } from "./models";
//
interface ProcessResult {
  usernameMatch: boolean;
  passwordMatch: boolean;
}
//
export const processSignInForm = (data: SignInData) => {
  const processResult: ProcessResult = {
    usernameMatch: false,
    passwordMatch: false,
  };
  axios
    .get("https://localhost:5001/api/account/signin", {
      username: data.username,
      password: data.password,
    })
    .then((res) => console.log(res.data));
};
