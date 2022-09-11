import {
  AggragatedSignUpHooksInterface,
  ISignUpProcessResult,
  SignUpFormError,
  SignUpInterface,
} from "utils/models";

// a helper function to process the sign up form, and check for any errors in it's fields.
export const processSignUpForm = (
  target: SignUpInterface,
  signUpHooks: AggragatedSignUpHooksInterface
): ISignUpProcessResult => {
  // deconstruction of the signUpHooks
  const {
    setUsernameError,
    setEmailError,
    setPasswordError,
    setFirstNameError,
    setLastNameError,
  } = signUpHooks;

  // deconstruction of the target
  const { username, password, email, firstName, lastName } = target;

  // the default value of processResult, will change if there are any errors in the sign up form
  // to stop the sign up request, and ask the user to refill the form
  const processResult: ISignUpProcessResult = { haltSignUp: false };

  // function to halt sign up process
  const haltSignUp = (): void => {
    processResult.haltSignUp = true;
  };

  // regexes
  const usernameRegex = /^(?=.{4,18}$)[a-zA-Z0-9._]+$/g;
  const englishRegex = /^(?=.{1,18}$)[a-zA-Z]*$/g;
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  // a required field error for the error state hooks
  const requiredFieldError: SignUpFormError = {
    error: true,
    errorMsg: "Required Field",
  };

  // an avoid spaces error for the error state hooks
  const whitespaceError: SignUpFormError = {
    error: true,
    errorMsg: "Field must be in english, with no symbols or spaces",
  };

  //
  const inputError: SignUpFormError = {
    error: true,
    errorMsg: "Field must be in english, with no symbols or spaces",
  };

  //
  const emailError: SignUpFormError = {
    error: true,
    errorMsg: "Not a valid email address",
  };

  // an only english allowed error for the error state hooks
  const englishOnly: SignUpFormError = {
    error: true,
    errorMsg: "Field must contains only english characters",
  };

  // field is too short error
  const usernameLengthErrror: SignUpFormError = {
    error: true,
    errorMsg: "Username should be 4 to 20 characters long",
  };

  // password length error
  const passwordLengthError: SignUpFormError = {
    error: true,
    errorMsg: "Password must be at least 8 characters",
  };

  // username test
  if (username.value.length <= 3) {
    haltSignUp();
    setUsernameError(usernameLengthErrror);
  } else {
    checkField(
      username,
      setUsernameError,
      requiredFieldError,
      inputError,
      usernameRegex,
      processResult,
      haltSignUp
    );
  }

  // email test
  checkField(
    email,
    setEmailError,
    requiredFieldError,
    emailError,
    emailRegex,
    processResult,
    haltSignUp
  );

  // password test
  if (password.value.trim().length === 0) {
    processResult.haltSignUp = true;
    signUpHooks.setPasswordError(requiredFieldError);
  } else if (passwordLengthCheck(password)) {
    setPasswordError(passwordLengthError);
  }

  // first name test
  checkField(
    firstName,
    setFirstNameError,
    requiredFieldError,
    englishOnly,
    englishRegex,
    processResult,
    haltSignUp
  );

  // last name test
  checkField(
    lastName,
    setLastNameError,
    requiredFieldError,
    englishOnly,
    englishRegex,
    processResult,
    haltSignUp
  );

  return processResult;
};
// a function to check whether the passed field is empty or not, if it's empty, an error is set.
// if it isn't empty, another check for validity is ran, with the passed regex.
const checkField = (
  inputString: { value: string },
  setError: React.Dispatch<React.SetStateAction<SignUpFormError>>,
  requiredError: SignUpFormError,
  inputError: SignUpFormError,
  regex: RegExp,
  processResult: ISignUpProcessResult,
  haltSignUp: Function
): void => {
  if (inputString.value.trim().length === 0) {
    processResult.haltSignUp = true;
    haltSignUp();
    setError(requiredError);
  } else if (inputString.value.match(regex) === null) {
    setError(inputError);
  }
};

// check the length of the input, to see if it meets the length requirements
const passwordLengthCheck = (inputString: { value: string }): boolean => {
  return inputString.value.length < 8;
};

// helper for setting state of the sign up errors
// this function checks if there's a need to re-set the state, so not to rerender the component
// on every onChange trigger
export const setError = (
  e: React.SyntheticEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<SignUpFormError>>,
  newErrorState: SignUpFormError,
  currentErrorState: SignUpFormError
): void => {
  if (currentErrorState.error) setter(newErrorState);
};
