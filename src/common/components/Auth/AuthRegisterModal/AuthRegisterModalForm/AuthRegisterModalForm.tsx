import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../../../../routes/routes";
import Input from "../../../Form/Input";
import PasswordInput from "../../../Form/PasswordInput";
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

        navigate(AUTH_ROUTES.LOGIN, { replace: true });
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
            <PasswordInput
              label="Password"
              name="password"
              setFieldValue={setFieldValue}
              wrapperClassName="flex-1"
            />
            <PasswordInput
              label="ConfirmPassword"
              name="confirm_password"
              setFieldValue={setFieldValue}
              wrapperClassName="flex-1"
            />
          </div>
          <AuthRegisterModalFormSubmit isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default AuthRegisterModalForm;
/*
 * DOCS :
 * Represents the register modal form
 * Responsible for handling credentials-based register
 */
