import { FC } from "react";
import { getInitials } from "../../data/helpers/helpers";
import useUserApi from "./data/hooks/useUser.api";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const UserInitials: FC<Props> = ({ onClick }) => {
  const { userData } = useUserApi();

  const getUserInitials = () => {
    if (!userData) return;

    return getInitials(userData.first_name, userData.last_name);
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-full bg-indigo-500 px-2 py-1.5 shadow-md hover:shadow-indigo-600"
    >
      {getUserInitials()}
    </div>
  );
};

export default UserInitials;
