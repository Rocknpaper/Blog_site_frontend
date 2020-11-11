import { InputType } from "../models/index";

const validate = (inputConf: InputType) => {
  if (!inputConf.validation) {
    return true;
  }

  let isValid = true;

  if (inputConf.validation.required) {
    isValid = inputConf.elementConfig.value !== "" && isValid;
  }

  if (inputConf.validation.isEmail) {
    isValid = validate_email(inputConf.elementConfig.value) && isValid;
  }

  if (inputConf.validation.maxLength) {
    isValid =
      inputConf.elementConfig.value.length <= inputConf.validation.maxLength &&
      isValid;
  }

  if (inputConf.validation.minLength) {
    isValid =
      inputConf.elementConfig.value.length >= inputConf.validation.minLength &&
      isValid;
  }

  return isValid;
};

function validate_email(email: string) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) == false) {
    return false;
  }
  return true;
}

export default validate;
