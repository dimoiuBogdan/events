import { useQuery } from "react-query";
import useAuthApi from "../../../Auth/data/hooks/useAuth.api";
import { getUserIdFromAccessToken } from "../helpers/user.helper";
import { UserType } from "../models/user.models";
import { getUserById, getUserProfileImage } from "../services/user.service";

export const USER_QUERY_KEYS = {
  getUserData: "get-user-data",
  getUserProfileImage: "get-user-profile-image",
};

type ReturnProps = {
  userData: UserType | undefined;
  userProfileImage: string | undefined;
  loadingProfileImage: boolean;
};
const useUserApi = (): ReturnProps => {
  const { logoutUserRequest } = useAuthApi();

  const userId = getUserIdFromAccessToken();

  const { data: userData } = useQuery({
    queryKey: [USER_QUERY_KEYS.getUserData, userId],
    staleTime: Infinity,
    queryFn: async () => {
      if (!userId) return;

      const res = await getUserById(userId);

      return res;
    },
    enabled: !!userId,
    onError: () => {
      logoutUserRequest.mutate();
    },
  });

  const { data: userProfileImage, isLoading: loadingProfileImage } = useQuery({
    queryKey: [USER_QUERY_KEYS.getUserProfileImage, userId],
    staleTime: Infinity,
    queryFn: async () => {
      if (!userId) return;

      const res = await getUserProfileImage(userId);

      if (!res) return;

      const image = URL.createObjectURL(res);

      return image;
    },
    enabled: !!userId,
    onError: () => {
      logoutUserRequest.mutate();
    },
  });

  return {
    userData,
    loadingProfileImage,
    userProfileImage,
  };
};

export default useUserApi;
