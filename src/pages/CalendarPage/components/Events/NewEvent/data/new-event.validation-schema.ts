import * as yup from "yup";

export const newEventValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .typeError("Name must be text"),
  from_date: yup
    .date()
    .required("From date is required")
    .typeError("From must be a date"),
  to_date: yup
    .date()
    .required("To date is required")
    .typeError("To must be a date"),
  description: yup.string().typeError("Description must be text").optional(),
  contact: yup.string().typeError("Contact must be text").optional(),
  location: yup.string().typeError("Location must be text").optional(),
});
