import { UserType } from "../../../../../../common/components/User/data/models/user.models";

export type ProfileDataType = Omit<UserType, "id">;

export type UpdateProfileDataFieldRequestType = {
  value: string;
  key: string;
};
