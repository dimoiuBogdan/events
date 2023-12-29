import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Form/Input";
import useAuthApi from "../data/hooks/useAuth.api";
import { AuthModalLoginType } from "../data/models/auth.models";
import { loginValidationSchema } from "./data/auth-login-modal.validation-schema";
import { loginInitialValues } from "./data/helpers/auth-login-modal.helper";

const AuthLoginModalForm = () => {
  const navigate = useNavigate();
  const { loginUserRequest } = useAuthApi();

  const handleLogin = (
    values: AuthModalLoginType,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
  ) => {
    loginUserRequest.mutate(values, {
      onSuccess: () => {
        resetForm();

        navigate("/calendar", { replace: true });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={loginValidationSchema}
      initialValues={loginInitialValues}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        handleLogin(values, setSubmitting, resetForm)
      }
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-y-6">
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
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={(value) => {
              setFieldValue("password", value);
            }}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto mt-4 w-fit rounded-md bg-indigo-500 px-5 py-1.5 shadow-sm hover:bg-indigo-600"
          >
            Login
          </button>
          <Link
            to="/register"
            className="mx-auto mt-2 cursor-pointer text-sm text-zinc-300 hover:text-white"
          >
            Don't have an account? Register
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default AuthLoginModalForm;
