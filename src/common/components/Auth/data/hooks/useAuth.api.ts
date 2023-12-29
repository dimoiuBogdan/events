import { UseMutationResult, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../redux/hooks";
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
import { loginUser, logoutUser, registerUser } from "../services/auth.services";

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
};
const useAuthApi = (): ReturnProps => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = !!(
    getFromLocalStorage("access_token") && getFromLocalStorage("refresh_token")
  );

  const registerUserRequest = useMutation({
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
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Creating account failed!",
          message: "The account could not be created.",
        }),
      );
    },
  });

  const loginUserRequest = useMutation({
    mutationFn: async (user: AuthModalLoginType) => {
      const res = await loginUser(user);

      return res;
    },
    onSuccess: (data: AuthUserReturnType) => {
      saveToLocalStorage("access_token", data.accessToken);
      saveToLocalStorage("refresh_token", data.refreshToken);
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Logging in failed!",
          message: "Check your credentials and try again.",
        }),
      );
    },
  });

  const logoutUserRequest = useMutation({
    mutationFn: async () => {
      const refreshToken = getFromLocalStorage("refresh_token");

      const res = await logoutUser(refreshToken);

      return res;
    },
    onSuccess: () => {
      removeFromLocalStorage("access_token");
      removeFromLocalStorage("refresh_token");

      navigate("/login", { replace: true });
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Logout failed!",
          message: "Could not log out.",
        }),
      );
    },
  });

  return {
    registerUserRequest,
    loginUserRequest,
    logoutUserRequest,
    isAuthenticated,
  };
};

export default useAuthApi;
