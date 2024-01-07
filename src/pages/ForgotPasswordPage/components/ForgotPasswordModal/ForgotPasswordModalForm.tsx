import { Form, Formik } from "formik";
import { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthApi from "../../../../common/components/Auth/data/hooks/useAuth.api";
import Input from "../../../../common/components/Form/Input";
import { AUTH_ROUTES } from "../../../../routes/routes";
import ForgotPasswordModalNew from "./ForgotPasswordModalNew";
import { forgotPasswordValidationSchema } from "./data/forgot-password-modal.validation-schema";
import { ForgotPasswordInitialValues } from "./data/helpers/forgot-password-modal.helper";
import { ForgotPasswordModalType } from "./data/models/forgot-password-modal.models";

const ForgotPasswordModalForm = () => {
  const { resetToken } = useParams();
  const { forgotPasswordRequest, verifyResetTokenRequest } = useAuthApi();

  const handleForgotPassword = (
    values: ForgotPasswordModalType,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
  ) => {
    forgotPasswordRequest.mutate(values.email, {
      onSuccess: () => {
        resetForm();
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const handleValidateResetToken = useCallback((resetToken: string) => {
    verifyResetTokenRequest.mutate(resetToken);
  }, []);

  useEffect(() => {
    if (resetToken) {
      handleValidateResetToken(resetToken);
    }
  }, []);

  if (verifyResetTokenRequest.isLoading) return <div>Loading...</div>;

  if (verifyResetTokenRequest.data) return <ForgotPasswordModalNew />;

  return (
    <Formik
      enableReinitialize
      validationSchema={forgotPasswordValidationSchema}
      initialValues={ForgotPasswordInitialValues}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        handleForgotPassword(values, setSubmitting, resetForm)
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto mt-4 w-fit rounded-md bg-indigo-500 px-5 py-1.5 shadow-sm hover:bg-indigo-600"
          >
            Send reset link
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

export default ForgotPasswordModalForm;
