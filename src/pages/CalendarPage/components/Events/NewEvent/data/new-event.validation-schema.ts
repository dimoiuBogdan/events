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
    .typeError("From must be a date")
    .max(yup.ref("to_date"), "From date must be before to date"),
  to_date: yup
    .date()
    .typeError("To must be a date")
    .min(yup.ref("from_date"), "To date must be after from date"),
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
