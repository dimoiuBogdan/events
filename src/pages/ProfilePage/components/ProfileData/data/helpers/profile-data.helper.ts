import { UserType } from "../../../../../../common/components/User/data/models/user.models";
import { ProfileDataType } from "../models/profile-data.models";

export const getProfileDataInitialValues = (
  userData: UserType,
): ProfileDataType => {
  return {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone_number: userData.phone_number,
  };
};
