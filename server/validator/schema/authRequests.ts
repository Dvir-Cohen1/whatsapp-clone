import yup from "yup";

const loginRequestSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

module.exports = { loginRequestSchema };