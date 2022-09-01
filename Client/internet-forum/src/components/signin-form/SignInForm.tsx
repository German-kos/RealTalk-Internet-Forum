import React, { useState } from "react";
import "components/signin-form/signinform.css";
import { useForm } from "react-hook-form";
import { SignInInterface } from "utils/models";
import logo from "assets/logo_white_svg.svg";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useSelector } from "react-redux";
import { SelectUser, signIn, UserState } from "redux/slices/UserSlice";
import store from "redux/store";
//
function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInterface>();
  //
  const submitSignIn = handleSubmit(async (data) => {
    await axios({
      method: "post",
      url: "https://localhost:5001/api/account/signin",
      headers: { "Content-Type": "application/json" },
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then(function (response) {
        console.log(response.data);
        const recievedUser: UserState = {
          id: response.data.id,
          UserName: response.data.username,
          FirstName: response.data.firstName,
          LastName: response.data.lastName,
          Email: response.data.email,
          Token: response.data.email,
        };
        store.dispatch(signIn(recievedUser));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  //
  const navToSignUp = () => navigate("/signup");
  //
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  //
  const eyeButton = () => {
    return showPassword ? (
      <VisibilityOffIcon
        className="eye-button"
        onClick={togglePasswordVisibility}
      />
    ) : (
      <VisibilityIcon
        className="eye-button"
        onClick={togglePasswordVisibility}
      />
    );
  };
  return (
    <div className="sign-in_flex_container">
      <div className="sign-in_form_container">
        <div className="sign-in_form_logo_container">
          <img className="sign-in_form_logo" alt="RealTalk" src={logo} />
        </div>
        <form className="sign-in_form" onSubmit={submitSignIn}>
          <div className="sign-in_form_input_section">
            <label>USERNAME</label>
            <input {...register("username", { required: true })} />
            {errors.username && (
              <div className="sign-in_form_error">This field is required</div>
            )}
          </div>
          <div className="sign-in_form_input_section">
            <label>PASSWORD</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <>{eyeButton()}</>
            {errors.password && (
              <div className="sign-in_form_error">This field is required</div>
            )}
          </div>
          <div>
            <button type="submit">SIGNIN</button>
          </div>
          <div className="sign-in_form_not-a-member">
            <p>Not a member?</p>
            <a onClick={navToSignUp}>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignInForm;
