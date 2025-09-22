const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PHONE = 'PHONE'; 
const VALIDATOR_TYPE_DATE = 'DATE';
const VALIDATOR_TYPE_LICENSE_NUMBER = 'LICENSE_NUMBER'; // New validator type for license number
const VALIDATOR_TYPE_NUMBER_PLATE = 'NUMBER_PLATE'; // New validator type for number plate


export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_PHONE = () => ({ type: VALIDATOR_TYPE_PHONE });
export const VALIDATOR_DATE = () => ({ type: VALIDATOR_TYPE_DATE });
export const VALIDATOR_LICENSE_NUMBER = () => ({ type: VALIDATOR_TYPE_LICENSE_NUMBER }); // Validator for license number
export const VALIDATOR_NUMBER_PLATE = () => ({ type: VALIDATOR_TYPE_NUMBER_PLATE }); // Validator for number plate


export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PHONE) { 
      isValid = isValid && /^\d{10}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_DATE) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      const inputDate = new Date(value);
      isValid = isValid && inputDate > today;
    }
    if (validator.type === VALIDATOR_TYPE_LICENSE_NUMBER) { // Validation logic for license number
      isValid = isValid && /^[A-Z]\d{7}$/.test(value); // Assuming the license number format is one letter followed by 7 digits
    }
    if (validator.type === VALIDATOR_TYPE_NUMBER_PLATE) {
      isValid = isValid && /^[A-Z]{3}-\d{4}$/.test(value); // Assuming the number plate format is three letters followed by a dash and four digits
    }
  }
  return isValid;
};
