import * as yup from "yup";

export const newEventValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .typeError("Name must be text"),
  from: yup
    .date()
    .required("From is required")
    .typeError("From must be a date"),
  to: yup.date().required("To is required").typeError("To must be a date"),
  description: yup.string().typeError("Description must be text").optional(),
  contact: yup.string().typeError("Contact must be text").optional(),
  location: yup.string().typeError("Location must be text").optional(),
});
