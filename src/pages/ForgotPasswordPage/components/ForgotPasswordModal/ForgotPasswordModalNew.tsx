import { Form, Formik } from "formik";
import { Link, useParams } from "react-router-dom";
import useAuthApi from "../../../../common/components/Auth/data/hooks/useAuth.api";
import PasswordInput from "../../../../common/components/Form/PasswordInput";
import { AUTH_ROUTES } from "../../../../routes/routes";
import { forgotPasswordNewValidationSchema } from "./data/forgot-password-modal.validation-schema";
import { ForgotPasswordNewInitialValues } from "./data/helpers/forgot-password-modal.helper";
import { ForgotPasswordNewModalType } from "./data/models/forgot-password-modal.models";

const ForgotPasswordModalNew = () => {
  const { resetToken } = useParams();
  const { setNewPasswordRequest } = useAuthApi();

  const handleResetPassword = (
    values: ForgotPasswordNewModalType,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
  ) => {
    console.log(resetToken);

    if (!resetToken) {
      setSubmitting(false);

      return;
    }

    setNewPasswordRequest.mutate(
      { resetToken, password: values.password },
      {
        onSettled: () => {
          resetForm();

          setSubmitting(false);
        },
      },
    );
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={forgotPasswordNewValidationSchema}
      initialValues={ForgotPasswordNewInitialValues}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        handleResetPassword(values, setSubmitting, resetForm)
      }
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-y-6">
          <PasswordInput
            label="Password"
            name="password"
            setFieldValue={setFieldValue}
          />
          <PasswordInput
            label="Reepat Password"
            name="repeat_password"
            setFieldValue={setFieldValue}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto mt-4 w-fit rounded-md bg-indigo-500 px-5 py-1.5 shadow-sm hover:bg-indigo-600"
          >
            Reset Password
          </button>
          <Link
            to={AUTH_ROUTES.LOGIN}
            className="mx-auto mt-2 cursor-pointer text-sm text-zinc-300 hover:text-white"
          >
            Remembered it? Go back to login
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordModalNew;
/*
 * DOCS :
 * Represents the main app file
 * Holds the app routes
 * Holds the app providers
 * Responsible app-wide initializations
 */
