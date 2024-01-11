import AuthModalWrapper from "../AuthModalWrapper";
import AuthLoginModalForm from "./AuthLoginModalForm";

const AuthLoginModal = () => {
  return (
    <AuthModalWrapper>
      <div className="text-2xl font-medium">Login</div>
      <div className="mb-6 text-sm text-zinc-400">Enter your credentials</div>
      <AuthLoginModalForm />
    </AuthModalWrapper>
  );
};

export default AuthLoginModal;
/*
 * DOCS :
 * Represents the login modal
 * Holds the login form
 */
