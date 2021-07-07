/* ==============================================Module validating signup data=========================== */
//module
const valid = (name, email, password, c_password) => {
  //check all fields are filled in
  if (!name || !email || !password) return "Please add all fields";

  //call validation function
  if (!checkValidEmail(email)) return "Invalid email";

  //password to be 6 characters long
  if (password.length < 6)
    return "Password too short! Enter at least 6 characters";

  //compare passwords
  if (password !== c_password)
    return "Passwords do not match! Please try again.";
};

const checkValidEmail = (email) => {
  //expression for validating email addresses sourced from:
  //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //return boolean to indicate whether email matches expression's pattern
  return re.test(String(email).toLowerCase());
};

//export module
export default valid;
