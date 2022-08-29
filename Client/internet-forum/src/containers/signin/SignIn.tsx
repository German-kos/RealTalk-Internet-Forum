import React from "react";
import "containers/signin/signin.css";
import SignInForm from "components/signin-form/SignInForm";
function SignIn() {
  return (
    <div className="sign-in_container">
      <div>
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
