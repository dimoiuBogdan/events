import { FC } from "react";
import { getInitials } from "../../data/helpers/helpers";
import useUserApi from "./data/hooks/useUser.api";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const UserInitials: FC<Props> = ({ onClick }) => {
  const { userData } = useUserApi();
  const { userProfileImage } = useUserApi();

  const getUserInitials = () => {
    if (!userData) return;

    return getInitials(userData.first_name, userData.last_name);
  };

  if (userProfileImage)
    return (
      <img
        onClick={onClick}
        src={userProfileImage}
        alt="profile image"
        className="h-8 w-8 cursor-pointer rounded-full object-cover"
      />
    );

  return (
    <div
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-500 shadow-md hover:shadow-indigo-600"
    >
      {getUserInitials()}
    </div>
  );
};

export default UserInitials;
/*
 * DOCS :
 * Represents the user first name + last name initials or image if existing
 */
