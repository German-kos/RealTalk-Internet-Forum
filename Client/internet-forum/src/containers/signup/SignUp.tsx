import React from "react";
import "containers/signup/signup.css";
import SignUpForm from "components/signup-form/SignUpForm";
import { motion } from "framer-motion";
function SignUp() {
  return (
    <motion.div
      className="sign-up_container"
      initial={{ height: 0 }}
      animate={{ height: "100vh" }}
      exit={{ y: window.innerHeight, transition: { duration: 0.5 } }}
    >
      <div>
        <SignUpForm />
      </div>
    </motion.div>
  );
}

export default SignUp;
