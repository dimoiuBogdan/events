import * as yup from "yup";
import {
  MAX_INPUT_LENGTHS,
  ROMANIAN_PHONE_NUMBER_REGEX,
} from "../../../../data/constants";

export const registerValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .typeError("Must be text")
    .max(
      MAX_INPUT_LENGTHS.SHORT,
      `Must be less than ${MAX_INPUT_LENGTHS.SHORT} characters`,
    ),
  last_name: yup
    .string()
    .required("Last name is required")
    .typeError("Must be text")
    .max(
      MAX_INPUT_LENGTHS.SHORT,
      `Must be less than ${MAX_INPUT_LENGTHS.SHORT} characters`,
    ),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  phone_number: yup
    .string()
    .matches(
      ROMANIAN_PHONE_NUMBER_REGEX,
      "Must be a valid Romanian phone number",
    )
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Password must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Password must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
});
