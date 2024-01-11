import AuthModalWrapper from "../../../../common/components/Auth/AuthModalWrapper";
import ForgotPasswordModalForm from "./ForgotPasswordModalForm";

const ForgotPasswordModal = () => {
  return (
    <AuthModalWrapper>
      <div className="mb-6 text-2xl font-medium">Reset Password</div>
      <ForgotPasswordModalForm />
    </AuthModalWrapper>
  );
};

export default ForgotPasswordModal;
/*
 * DOCS :
 * Represents the modal for the forgot password form
 */
