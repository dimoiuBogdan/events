import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "./Input";

type Props = {
  label: string;
  name: string;
  setFieldValue: (field: string, value: string) => void;
  wrapperClassName?: string;
};
const PasswordInput: FC<Props> = ({
  label,
  name,
  setFieldValue,
  wrapperClassName,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      id={name}
      label={label}
      name={name}
      wrapperClassName={wrapperClassName}
      type={showPassword ? "text" : "password"}
      onChange={(value) => {
        setFieldValue(name, value);
      }}
      required
      icon={
        showPassword ? (
          <FaEyeSlash
            onClick={() => setShowPassword(false)}
            className="h-6 w-6 cursor-pointer text-indigo-500"
          />
        ) : (
          <FaEye
            onClick={() => setShowPassword(true)}
            className="h-6 w-6 cursor-pointer text-indigo-500"
          />
        )
      }
    />
  );
};

export default PasswordInput;
