import { ErrorMessage, useFormikContext } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FC, HTMLInputTypeAttribute } from "react";
import { cn } from "../../data/utils";

type Props = {
  id: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  value?: string;
  required?: boolean;
  textarea?: boolean;
};
const Input: FC<Props> = ({
  value,
  id,
  label,
  onChange,
  name,
  required = false,
  type = "text",
  textarea,
}) => {
  const { getFieldMeta } = useFormikContext();

  const fieldError = getFieldMeta(name).error;

  return (
    <div>
      <label htmlFor={name}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <InputTextarea
          id={id}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          value={value}
          className={cn("w-full rounded-md px-2 py-1 text-zinc-800 shadow-sm", {
            "bg-red-300": fieldError,
          })}
        />
      ) : (
        <InputText
          id={id}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          type={type}
          value={value}
          className={cn("w-full rounded-md px-2 py-1 text-zinc-800 shadow-sm", {
            "bg-red-300": fieldError,
          })}
        />
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-400"
      />
    </div>
  );
};

export default Input;
