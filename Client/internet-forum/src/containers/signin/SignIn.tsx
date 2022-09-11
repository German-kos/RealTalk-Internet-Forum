import React from "react";
import "containers/signin/signin.css";
import SignInForm from "components/signin-form/SignInForm";
import { motion } from "framer-motion";
function SignIn() {
  return (
    <motion.div
      className="sign-in_container"
      initial={{ height: 0 }}
      animate={{ height: "100vh" }}
      exit={{ y: -window.innerHeight, transition: { duration: 0.5 } }}
    >
      <div>
        <SignInForm />
      </div>
    </motion.div>
  );
}

export default SignIn;
