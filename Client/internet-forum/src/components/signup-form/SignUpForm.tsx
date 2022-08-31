import React from "react";
import "components/signup-form/signupform.css";
import { useForm } from "react-hook-form";
import { SignUpInterface } from "utils/models";
import { useNavigate } from "react-router-dom";
//

export default function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInterface>();
  //

  //
  const navToSignIn = () => navigate("/signin");
  return (
    <div className="sign-up_flex_container">
      <div className="sign-up_form_container">
        <form className="sign-up_form">
          <div>
            <label>USERNAME</label>
            <input {...register("username", { required: true })} />
          </div>
          <div>
            <label>EMAIL</label>
            <input {...register("username", { required: true })} />
          </div>

          <div>
            <label>PASSWORD</label>
            <input {...register("password", { required: true })} />
          </div>
          <div>
            <label>FIRST NAME</label>
            <input {...register("firstName", { required: true })} />
          </div>
          <div>
            <label>LAST NAME</label>
            <input {...register("lastName", { required: true })} />
          </div>
          <div>
            <button type="submit">SIGN UP</button>
          </div>
          <div className="sign-in_form_already-a-member">
            <p>Already a member?</p>
            <a onClick={navToSignIn}>Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
}
