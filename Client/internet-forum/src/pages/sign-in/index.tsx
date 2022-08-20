import { processResult } from "immer/dist/internal";
import "pages/sign-in/style.css";
import { useState } from "react";
import { appendErrors, useForm } from "react-hook-form";
import { processSignInForm } from "utils/helpers";
import { FormErrorInterface, SignInData } from "utils/models";
//
interface Erroring {
  type: string;
  name: "password" | "username";
  message: string;
}
function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInData>();
  //
  const onSubmit = handleSubmit((data) => {
    const processResult = processSignInForm(data.username, data.password);
    // destructuring the process result
    const {
      usernameIsOkay,
      passwordIsOkay,
      resultMessageUsername,
      resultMessagePassword,
    } = processResult;
    // error setters
    const usernameError = () =>
      setError("username", { message: resultMessageUsername });
    const passwordError = () =>
      setError("password", { message: resultMessagePassword });
    //
    if (!usernameIsOkay && !passwordIsOkay) {
      usernameError();
      passwordError();
    } else if (!usernameIsOkay) usernameError();
    else if (!passwordIsOkay) passwordError();
    //
  });
  return (
    <form onSubmit={onSubmit}>
      <label>Username</label>
      <input {...register("username", { required: true })} />
      {errors.username && (
        <div className="error">
          {errors.username.message === ""
            ? "Required field"
            : errors.username.message}
        </div> // add a fn to decide whether to show error message or 'required field'
      )}
      <label>Password</label>
      <input {...register("password", { required: true })} />
      {errors.password && (
        <div className="error">
          {errors.password.message === ""
            ? "Required field."
            : errors.password.message}
        </div>
      )}

      <button type="submit">Sign In</button>
    </form>
  );
}
export default SignIn;
