import * as yup from "yup";
import { MAX_INPUT_LENGTHS } from "../../../../data/constants";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  password: yup
    .string()
    .required("Password is required")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
});
