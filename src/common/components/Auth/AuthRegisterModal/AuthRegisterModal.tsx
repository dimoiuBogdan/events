import AuthModalWrapper from "../AuthModalWrapper";
import AuthRegisterModalForm from "./AuthRegisterModalForm/AuthRegisterModalForm";

const AuthRegisterModal = () => {
  return (
    <AuthModalWrapper>
      <div className="text-2xl font-medium">Register</div>
      <div className="mb-6 text-sm text-zinc-400">
        Create an account to get started
      </div>
      <AuthRegisterModalForm />
    </AuthModalWrapper>
  );
};

export default AuthRegisterModal;
/*
 * DOCS :
 * Represents the login modal
 * Holds the login form
 */
