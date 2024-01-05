import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { NotificationsReducerActions } from "../../../../../../common/components/Notifications.tsx/data/reducers/notifications.reducer.actions";
import useUserApi, {
  USER_QUERY_KEYS,
} from "../../../../../../common/components/User/data/hooks/useUser.api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { UpdateProfileDataFieldRequestType } from "../models/profile-data.models";
import {
  updateProfileField,
  uploadProfileImage,
} from "../services/profile-data.services";

export const PROFILE_QUERY_KEYS = {
  updateProfileField: "update-profile-field",
  uploadProfileImage: "upload-profile-image",
};

type ReturnProps = {
  updateProfileDataFieldRequest: UseMutationResult<
    boolean,
    unknown,
    UpdateProfileDataFieldRequestType,
    unknown
  >;
  uploadProfileImageRequest: UseMutationResult<boolean, unknown, File, unknown>;
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

  const uploadProfileImageRequest = useMutation({
    mutationKey: [PROFILE_QUERY_KEYS.uploadProfileImage],
    mutationFn: async (image: File) => {
      if (!userData) return false;

      const res = await uploadProfileImage(userData.id, image);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Profile image updated!",
          message: "Your profile image was updated successfully.",
        }),
      );

      queryClient.invalidateQueries([USER_QUERY_KEYS.getUserData]);
      queryClient.invalidateQueries([USER_QUERY_KEYS.getUserProfileImage]);
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Profile image update failed!",
          message: "Your profile image could not be updated.",
        }),
      );
    },
  });

  return {
    updateProfileDataFieldRequest,
    uploadProfileImageRequest,
  };
};

export default useProfileApi;
