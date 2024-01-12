import { useFormikContext } from "formik";
import { FC, HTMLInputTypeAttribute, useState } from "react";
import { FaCandyCane, FaCheck, FaRegEdit } from "react-icons/fa";
import Input from "../../../../common/components/Form/Input";
import useProfileApi from "./data/hooks/useProfileApi";
import { ProfileDataType } from "./data/models/profile-data.models";

type Props = {
  label: string;
  data: string;
  name: keyof ProfileDataType;
  type?: HTMLInputTypeAttribute | undefined;
};
const ProfileDataProperty: FC<Props> = ({ data, label, name, type }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { setFieldValue, values, resetForm, getFieldMeta, submitForm } =
    useFormikContext<ProfileDataType>();
  const { updateProfileDataFieldRequest } = useProfileApi();

  const handleToggleEdit = () => {
    setIsEditMode((prev) => !prev);

    resetForm();
  };

  const handleSave = () => {
    const updatedValue = values[name];
    const isValid = !getFieldMeta(name).error;

    submitForm();

    if (!isValid) return;

    updateProfileDataFieldRequest.mutate({ value: updatedValue, key: name });

    handleToggleEdit();
  };

  return (
    <div className="flex items-baseline gap-x-3">
      {label} :
      {!isEditMode ? (
        <span
          onClick={handleToggleEdit}
          className="flex cursor-pointer items-center gap-x-2 font-medium text-indigo-100 hover:text-indigo-400"
        >
          {data} <FaRegEdit />
        </span>
      ) : (
        <div className="flex items-center gap-x-4">
          <Input
            required
            id={name}
            onChange={(value) => setFieldValue(name, value)}
            name={name}
            type={type}
          />
          <FaCheck
            onClick={handleSave}
            className="cursor-pointer text-xl text-green-400"
          />
          <FaCandyCane
            onClick={handleToggleEdit}
            className="cursor-pointer text-xl text-red-400"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDataProperty;
/*
 * DOCS :
 * Represents the profile page data
 * Responsible for displaying and editing a certain property if desired
 */
