import React from "react";
import "components/signin-form/signinform.css";
import { useForm } from "react-hook-form";
import { SignInInterface } from "utils/models";
import logo from "assets/logo_white_svg.svg";
function SignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInterface>();
  //
  const submitSignIn = handleSubmit((data) => {
    console.log("first");
  });
  //
  return (
    <div className="sign-in_flex_container">
      <div className="sign-in_form_container">
        <div className="sign-in_form_logo_container">
          <img className="sign-in_form_logo" alt="RealTalk" src={logo} />
        </div>
        <form className="sign-in_form" onSubmit={submitSignIn}>
          <div>
            <label>USERNAME</label>
            <input {...register("username", { required: true })} />
            {errors.username && <div>This field is required</div>}
          </div>
          <div>
            <label>PASSWORD</label>
            <input {...register("password", { required: true })} />
            {errors.password && <div>This field is required</div>}
          </div>
          <button type="submit">SIGN-IN</button>
        </form>
      </div>
    </div>
  );
}
export default SignInForm;
