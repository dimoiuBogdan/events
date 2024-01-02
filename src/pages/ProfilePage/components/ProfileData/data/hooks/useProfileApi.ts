import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { NotificationsReducerActions } from "../../../../../../common/components/Notifications.tsx/data/reducers/notifications.reducer.actions";
import useUserApi, {
  USER_QUERY_KEYS,
} from "../../../../../../common/components/User/data/hooks/useUser.api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { UpdateProfileDataFieldRequestType } from "../models/profile-data.models";
import { updateProfileField } from "../services/profile-data.services";

export const PROFILE_QUERY_KEYS = {
  updateProfileField: "update-profile-field",
};

type ReturnProps = {
  updateProfileDataFieldRequest: UseMutationResult<
    boolean,
    unknown,
    UpdateProfileDataFieldRequestType,
    unknown
  >;
};
const useProfileApi = (): ReturnProps => {
  const dispatch = useAppDispatch();
  const { userData } = useUserApi();
  const queryClient = useQueryClient();

  const updateProfileDataFieldRequest = useMutation({
    mutationKey: [PROFILE_QUERY_KEYS.updateProfileField],
    mutationFn: async ({ value, key }: UpdateProfileDataFieldRequestType) => {
      if (!userData) return false;

      const res = await updateProfileField(userData.id, value, key);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Field updated!",
          message: "Field was updated successfully.",
        }),
      );

      queryClient.invalidateQueries([USER_QUERY_KEYS.getUserData]);
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Updating field failed!",
          message: "The field could not be updated.",
        }),
      );
    },
  });

  return {
    updateProfileDataFieldRequest,
  };
};

export default useProfileApi;
