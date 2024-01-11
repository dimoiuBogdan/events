import { FC } from "react";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "../../../../../routes/routes";

type Props = {
  isSubmitting: boolean;
};
const AuthRegisterModalFormSubmit: FC<Props> = ({ isSubmitting }) => {
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto mt-4 w-fit rounded-md bg-indigo-500 px-5 py-1.5 shadow-sm hover:bg-indigo-600"
      >
        Register
      </button>
      <Link
        to={AUTH_ROUTES.LOGIN}
        className="mx-auto mt-2 cursor-pointer text-sm text-zinc-300 hover:text-white"
      >
        Already have an account? Login
      </Link>
    </>
  );
};

export default AuthRegisterModalFormSubmit;
/*
 * DOCS :
 * Represents the login submit section
 * Responsible for finishing the login process
 */
