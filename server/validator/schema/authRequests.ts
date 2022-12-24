import * as yup from "yup";
import { passwordRegex } from "../password.validator";

const registerRequestSchema = new yup.ObjectSchema().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required().matches(passwordRegex),
});
const loginRequestSchema = new yup.ObjectSchema().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export { loginRequestSchema, registerRequestSchema };
