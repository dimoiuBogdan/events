import * as yup from "yup";
import { MAX_INPUT_LENGTHS } from "../../../../../../common/data/constants";

export const newEventValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .typeError("Name must be text")
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Name must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  from_date: yup
    .date()
    .required("From date is required")
    .typeError("From must be a date"),
  to_date: yup
    .date()
    .required("To date is required")
    .typeError("To must be a date"),
  description: yup
    .string()
    .typeError("Description must be text")
    .optional()
    .max(
      MAX_INPUT_LENGTHS.LONG,
      `Description must be less than ${MAX_INPUT_LENGTHS.LONG} characters`,
    ),
  contact: yup
    .string()
    .typeError("Contact must be text")
    .optional()
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Contact must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
  location: yup
    .string()
    .typeError("Location must be text")
    .optional()
    .max(
      MAX_INPUT_LENGTHS.MEDIUM,
      `Location must be less than ${MAX_INPUT_LENGTHS.MEDIUM} characters`,
    ),
});
