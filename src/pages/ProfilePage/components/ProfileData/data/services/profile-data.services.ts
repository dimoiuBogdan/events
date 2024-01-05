import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";

export const updateProfileField = async (
  id: string,
  value: string,
  key: string,
): Promise<boolean> => {
  const res = await axios.patch(`${BASE_API_URL}/users/${id}`, { key, value });

  return res.data;
};

export const uploadProfileImage = async (userId: string, image: File) => {
  if (!image) return false;

  // Create FormData object
  const formData = new FormData();
  formData.append("imageFormData", image);

  const res = await axios.post(
    `${BASE_API_URL}/upload-profile-image/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};
