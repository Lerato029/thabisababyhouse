const valid = (name, email, password, c_password) => {
  if (!name || !email || !password) return "Please add all fields";
  if (!validateEmail(email)) return "Invalid email";

  if (password.length < 6)
    return "Password too short! Enter at least 6 characters";

  if (password !== c_password)
    return "Passwords do not match! Please try again.";
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default valid;
