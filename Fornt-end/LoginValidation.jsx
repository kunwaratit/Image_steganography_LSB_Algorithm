function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (values.email === "") {
    error.email = "email should not be empty";
  } else if (email_pattern.test(values.email)) {
    error.email = "";
  } else {
    error.email = "email should be valid";
  }

  if (values.password === "") {
    error.password = "password should not be empty";
  } else if (password_pattern.test(values.password)) {
    error.password = "";
  } else {
    error.password =
      "passworld should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
  }
  return error;
}

export default Validation;
