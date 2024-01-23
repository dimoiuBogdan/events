import * as yup from "yup";
import { MAX_INPUT_LENGTHS } from "../../../../../../common/data/constants";

export const eventValidationSchema = yup.object().shape({
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
    .typeError("From date must be a valid date"),
  to_date: yup
    .date()
    .default(undefined)
    .typeError("To date must be a valid date")
    .when(
      "from_date",
      (from_date, yup) =>
        from_date &&
        yup.min(from_date, "End date can not be before start time"),
    ),
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
