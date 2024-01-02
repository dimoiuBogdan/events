import useUserApi from "../../common/components/User/data/hooks/useUser.api";
import ProfileData from "./components/ProfileData/ProfileData";

const ProfilePage = () => {
  const { userData } = useUserApi();

  return (
    <div>
      <div className="mb-4 text-xl font-medium">
        Welcome to your profile page, {userData?.first_name}
      </div>
      <ProfileData />
    </div>
  );
};

export default ProfilePage;
