export const registrationSchema = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'password': {
    notEmpty: true,
    isLength: {
      options: [{min:13}],
      errorMessage: 'Password has to be minimum 13 characters length.'
    },
    matches: {
      options: ["(?=.*[a-zA-Z])(?=.*[0-9]+).*", "g"],
      errorMessage: "Password must be alphanumeric."
    },
    errorMessage: 'Invalid Password'
  }
};

export const loginSchema = {
  "email": {
    notEmpty: true,
    isEmail: {
      errorMessage: "Invalid Email"
    }
  }
};
