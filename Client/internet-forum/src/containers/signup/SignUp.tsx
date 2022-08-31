import React from "react";
import "containers/signup/signup.css";
import SignUpForm from "components/signup-form/SignUpForm";
function SignUp() {
  return (
    <div className="sign-up_container">
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
