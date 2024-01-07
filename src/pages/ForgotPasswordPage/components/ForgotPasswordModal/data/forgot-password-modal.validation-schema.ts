import * as yup from "yup";
import { MAX_INPUT_LENGTHS } from "../../../../../common/data/constants";

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
});

export const forgotPasswordNewValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Password must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  repeat_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Password must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
});
