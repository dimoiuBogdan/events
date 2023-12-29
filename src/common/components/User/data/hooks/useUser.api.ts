import { useQuery } from "react-query";
import { getUserIdFromAccessToken } from "../helpers/user.helper";
import { UserType } from "../models/user.models";
import { getUserById } from "../services/user.service";

export const USER_QUERY_KEYS = {
  getUserData: "get-user-data",
};

type ReturnProps = {
  userData: UserType | undefined;
};
const useUserApi = (): ReturnProps => {
  const userId = getUserIdFromAccessToken();

  const { data: userData } = useQuery({
    queryKey: [USER_QUERY_KEYS.getUserData, userId],
    queryFn: async () => {
      if (!userId) return;

      const res = await getUserById(userId);

      return res;
    },
    enabled: !!userId,
  });

  return {
    userData,
  };
};

export default useUserApi;
