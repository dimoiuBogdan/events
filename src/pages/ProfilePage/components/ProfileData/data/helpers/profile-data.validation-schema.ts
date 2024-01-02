import * as yup from "yup";
import {
  MAX_INPUT_LENGTHS,
  ROMANIAN_PHONE_NUMBER_REGEX,
} from "../../../../../../common/data/constants";

export const profileDataValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Name is required")
    .typeError("Name must be text")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Name must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  last_name: yup
    .string()
    .required("Name is required")
    .typeError("Name must be text")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Name must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
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
});
