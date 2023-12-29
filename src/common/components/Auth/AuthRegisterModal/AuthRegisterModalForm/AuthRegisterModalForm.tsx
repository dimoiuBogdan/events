import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../../Form/Input";
import useAuthApi from "../../data/hooks/useAuth.api";
import { AuthModalRegisterType } from "../../data/models/auth.models";
import { registerValidationSchema } from "../data/auth-register-modal.validation-schema";
import { registerInitialValues } from "../data/helpers/auth-register-modal.helper";
import AuthRegisterModalFormSubmit from "./AuthRegisterModalFormSubmit";

const AuthRegisterModalForm = () => {
  const navigate = useNavigate();
  const { registerUserRequest } = useAuthApi();

  const handleRegister = (
    values: AuthModalRegisterType,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
  ) => {
    registerUserRequest.mutate(values, {
      onSuccess: () => {
        resetForm();

        navigate("/login", { replace: true });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={registerValidationSchema}
      initialValues={registerInitialValues}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        handleRegister(values, setSubmitting, resetForm)
      }
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-y-6">
          <div className="flex items-center gap-x-6">
            <Input
              id="first_name"
              label="First Name"
              name="first_name"
              onChange={(value) => {
                setFieldValue("first_name", value);
              }}
              required
              wrapperClassName="flex-1"
            />

            <Input
              id="last_name"
              label="Last Name"
              name="last_name"
              onChange={(value) => {
                setFieldValue("last_name", value);
              }}
              required
              wrapperClassName="flex-1"
            />
          </div>

          <Input
            id="email"
            label="Email"
            name="email"
            type="email"
            onChange={(value) => {
              setFieldValue("email", value);
            }}
            required
          />

          <Input
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            type="tel"
            onChange={(value) => {
              setFieldValue("phone_number", value);
            }}
            required
          />

          <div className="flex items-center gap-x-6">
            <Input
              id="password"
              label="Password"
              name="password"
              onChange={(value) => {
                setFieldValue("password", value);
              }}
              required
              wrapperClassName="flex-1"
              type="password"
            />

            <Input
              id="confirm_password"
              label="Confirm Password"
              name="confirm_password"
              onChange={(value) => {
                setFieldValue("confirm_password", value);
              }}
              required
              wrapperClassName="flex-1"
              type="password"
            />
          </div>
          <AuthRegisterModalFormSubmit isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default AuthRegisterModalForm;
