import "pages/sign-in/style.css";
import { appendErrors, useForm } from "react-hook-form";
import { processSignInForm } from "utils/helpers";
import { SignInData } from "utils/models";
//

function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
  } = useForm<SignInData>();
  //
  const onSubmit = handleSubmit((data) => {
    // if (data.username.trim().length > 0) trigger("username");
    // setError("username", { type: "No spaces allowed" });
    // console.log(data);
    processSignInForm(data);
  });
  return (
    <form onSubmit={onSubmit}>
      <label>Username</label>
      <input {...register("username", { required: true })} />
      {errors.username && <div className="error">Enter username</div>}
      <label>Password</label>
      <input {...register("password", { required: true })} />
      {errors.password && <div className="error">Enter password</div>}
      <button type="submit">Sign In</button>
    </form>
  );
}
export default SignIn;
