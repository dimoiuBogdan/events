import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordNewModalParamsType } from "../../../../../pages/ForgotPasswordPage/components/ForgotPasswordModal/data/models/forgot-password-modal.models";
import { useAppDispatch } from "../../../../../redux/hooks";
import { AUTH_ROUTES } from "../../../../../routes/routes";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../../../data/helpers/helpers";
import { NotificationsReducerActions } from "../../../Notifications.tsx/data/reducers/notifications.reducer.actions";
import {
  AuthModalLoginType,
  AuthModalRegisterType,
  AuthUserReturnType,
} from "../models/auth.models";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  setNewPassword,
  verifyResetToken,
} from "../services/auth.services";

export const AUTH_QUERY_KEYS = {
  isAuthenticated: "is-authenticated",
  logoutUser: "logout-user",
  loginUser: "login-user",
  registerUser: "register-user",
  forgotPassword: "forgot-password",
  verifyResetToken: "verify-reset-token",
  setNewPassword: "set-new-password",
};

type ReturnProps = {
  registerUserRequest: UseMutationResult<
    AuthUserReturnType,
    unknown,
    AuthModalRegisterType,
    unknown
  >;
  loginUserRequest: UseMutationResult<
    AuthUserReturnType,
    unknown,
    AuthModalLoginType,
    unknown
  >;
  logoutUserRequest: UseMutationResult<void, unknown, void, unknown>;
  isAuthenticated: boolean;
  forgotPasswordRequest: UseMutationResult<
    void,
    AxiosError<unknown, string>,
    string,
    unknown
  >;
  verifyResetTokenRequest: UseMutationResult<
    boolean,
    AxiosError<unknown, string>,
    string,
    unknown
  >;
  setNewPasswordRequest: UseMutationResult<
    boolean,
    AxiosError<unknown, string>,
    ForgotPasswordNewModalParamsType,
    unknown
  >;
};
const useAuthApi = (): ReturnProps => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = !!(
    getFromLocalStorage("access_token") && getFromLocalStorage("refresh_token")
  );

  const registerUserRequest = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.registerUser],
    mutationFn: async (user: AuthModalRegisterType) => {
      const res = await registerUser(user);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Successfully registered!",
          message: "Your account was created. You can now log in.",
        }),
      );
    },
    onError: (err: AxiosError) => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Creating account failed!",
          message: "The account could not be created.",
          status: err.response?.status,
        }),
      );
    },
  });

  const loginUserRequest = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.loginUser],
    mutationFn: async (user: AuthModalLoginType) => {
      const res = await loginUser(user);

      return res;
    },
    onSuccess: (data: AuthUserReturnType) => {
      saveToLocalStorage("access_token", data.accessToken);
      saveToLocalStorage("refresh_token", data.refreshToken);
    },
    onError: (err: AxiosError) => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Logging in failed!",
          message: "Check your credentials and try again.",
          status: err.response?.status,
        }),
      );
    },
  });

  const logoutUserRequest = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.logoutUser],
    mutationFn: async () => {
      const res = await logoutUser();

      return res;
    },
    onSuccess: () => {
      removeFromLocalStorage("access_token");
      removeFromLocalStorage("refresh_token");

      navigate(AUTH_ROUTES.LOGIN, { replace: true });
    },
    onError: (err: AxiosError) => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Logout failed!",
          message: "Could not log out.",
          status: err.response?.status,
        }),
      );
    },
  });

  const forgotPasswordRequest = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.forgotPassword],
    mutationFn: async (email: string) => {
      const res = await forgotPassword(email);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Successfully sent!",
          message: "Check your email to reset your password.",
        }),
      );
    },
    onError: (err: AxiosError) => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Could not send email!",
          message: "Sending forgot password email failed.",
          status: err.response?.status,
        }),
      );
    },
  });

  const verifyResetTokenRequest = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.verifyResetToken],
    mutationFn: async (resetToken: string) => {
      const res = await verifyResetToken(resetToken);

      return res;
    },
    onError: (err: AxiosError) => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Reset URL is invalid!",
          message: "Please try resetting your pasword again.",
          status: err.response?.status,
        }),
      );

      navigate(AUTH_ROUTES.LOGIN, { replace: true });
    },
  });

  const setNewPasswordRequest = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.verifyResetToken],
    mutationFn: async ({
      resetToken,
      password,
    }: ForgotPasswordNewModalParamsType) => {
      const res = await setNewPassword(resetToken, password);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Successfully set!",
          message: "You can now log in with your new password.",
        }),
      );
    },
    onError: (err: AxiosError) => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Setting new password failed!",
          message: "Please try again from scratch.",
          status: err.response?.status,
        }),
      );
    },
    onSettled: () => {
      navigate(AUTH_ROUTES.LOGIN, { replace: true });
    },
  });

  return {
    registerUserRequest,
    loginUserRequest,
    logoutUserRequest,
    isAuthenticated,
    forgotPasswordRequest,
    verifyResetTokenRequest,
    setNewPasswordRequest,
  };
};

export default useAuthApi;
