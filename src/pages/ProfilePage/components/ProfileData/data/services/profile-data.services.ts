import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";

/**
 * Updates a profile field for a user.
 *
 * @param {string} id - The ID of the user.
 * @param {string} value - The new value for the profile field.
 * @param {string} key - The key of the profile field to be updated.
 * @return {Promise<boolean>} A Promise that resolves to a boolean indicating whether the update was successful.
 */
export const updateProfileField = async (
  id: string,
  value: string,
  key: string,
): Promise<boolean> => {
  const res = await axios.patch(`${BASE_API_URL}/users/${id}`, { key, value });

  return res.data;
};

/**
 * Uploads a profile image for a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {File} image - The image file to upload.
 * @return {Promise<any>} A promise that resolves with the response data.
 */
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
