import useUserApi from "../../common/components/User/data/hooks/useUser.api";

const ProfilePage = () => {
  const { userData } = useUserApi();

  return <div>{userData?.email}</div>;
};

export default ProfilePage;
