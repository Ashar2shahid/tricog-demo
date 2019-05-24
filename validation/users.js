const isEmpty = require("./is_empty");

module.exports = function validateUserData(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.father_name = !isEmpty(data.father_name) ? data.father_name : "";
  data.pan_number = !isEmpty(data.pan_number) ? data.pan_number : "";
  data.date_of_birth = !isEmpty(data.date_of_birth) ? data.date_of_birth : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.profile_image = !isEmpty(data.profile_image) ? data.profile_image : "";

  if (!/^[a-zA-Z]+$/.test(data.first_name)) {
    errors.first_name = "First Name can only consist of letters";
  }

  if (data.first_name === "") {
    errors.first_name = "First Name field is required";
  }

  if (!/^[a-zA-Z]+$/.test(data.last_name)) {
    errors.last_name = "Last Name can only consist of letters";
  }

  if (data.last_name === "") {
    errors.last_name = "Last Name field is required";
  }

  if (!/^[a-zA-Z]+?(\s[a-zA-Z]+?)*$/.test(data.father_name)) {
    errors.father_name = "Fathers' Name can only consist of a single name or a first and last name seprated by a space";
  }

  if (data.father_name === "") {
    errors.father_name = "Fathers' Name field is required";
  }

  if (!/^[a-zA-Z]+?(\s[a-zA-Z]+?)*$/.test(data.father_name)) {
    errors.father_name =
      "Fathers' Name can only consist of a single name or a first and last name seprated by a space (only letters)";
  }

  if (data.father_name === "") {
    errors.father_name = "Fathers' Name field is required";
  }

  if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/.test(data.pan_number)) {
    errors.pan_number = "Invalid Pan Number";
  }

  if (data.pan_number === "") {
    errors.pan_number = "Pan Number is Required";
  }

  //Doenst work for all valid dates
  //   if (!/[0-9][0-9]\/((0+?[1-9])|(1+?[0-2]))\/((3+?[0-1])|([0-2][0-9]))/.test(data.date_of_birth)) {
  //     errors.date_of_birth = "Date of Birth is invalid";
  //   }

  if (
    !/^(?:(?:(?:(?:(?:[1-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:[2468][048]|[13579][26])00))(\/|-|\.)(?:0?2\1(?:29)))|(?:(?:[1-9]\d{1})(\/|-|\.)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[13-9]|1[0-2])\2(?:29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8])))))$/.test(
      data.date_of_birth
    )
  ) {
    errors.date_of_birth = "Date of Birth is invalid";
  }

  if (data.date_of_birth === "") {
    errors.date_of_birth = "Date of Birth is required";
  }

  if (data.gender === "") {
    errors.gender = "Gender is required";
  }

  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      data.email
    )
  ) {
    errors.email = "email is invalid";
  }

  if (data.email === "") {
    errors.email = "email is required";
  }

  if (data.address === "") {
    errors.address = "address is required";
  }

  if (
    /^(https?:\/\/)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?$/.test(
      data.profile_image
    )
  ) {
    errors.profile_image = "URL for profile image is invalid";
  }

  if (data.profile_image === "") {
    errors.profile_image = "profile image URL is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
