import UserInitials from "../../../../../common/components/User/UserInitials";
import useProfileApi from "../data/hooks/useProfileApi";

const ProfileDataImage = () => {
  const { uploadProfileImageRequest } = useProfileApi();

  const handleUploadProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file, file.name);
    const image = formData.get("image") as File;

    uploadProfileImageRequest.mutate(image);
  };

  return (
    <div className="relative">
      <UserInitials />
      <input
        type="file"
        className="absolute left-0 top-0 h-8 w-8 opacity-0"
        name="file"
        id="file"
        accept="image/*"
        onChange={handleUploadProfileImage}
      />
    </div>
  );
};

export default ProfileDataImage;
/*
 * DOCS :
 * Represents the user image inside the profile page
 * Holds the user initials for displayment
 * Responsible for updating user image
 */
