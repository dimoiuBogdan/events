import { ErrorMessage, useFormikContext } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FC, HTMLInputTypeAttribute } from "react";
import { cn } from "../../data/helpers/helpers";

type Props = {
  className?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  id: string;
  label?: string;
  name: string;
  onChange: (value: string) => void;
  required?: boolean;
  textarea?: boolean;
  type?: HTMLInputTypeAttribute;
  wrapperClassName?: string;
};
const Input: FC<Props> = ({
  className,
  disabled,
  icon,
  id,
  label,
  name,
  onChange,
  required = false,
  textarea,
  type = "text",
  wrapperClassName,
}) => {
  const { getFieldMeta } = useFormikContext();

  const fieldError = getFieldMeta(name).error;
  const initialValue = getFieldMeta(name).initialValue as string;
  const fieldValue = getFieldMeta(name).value as string;

  return (
    <div className={cn("relative", wrapperClassName)}>
      {label && (
        <label className="text-zinc-200" htmlFor={name}>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <span className="relative">
        {textarea ? (
          <InputTextarea
            id={id}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            value={fieldValue ?? initialValue}
            className={cn(
              "w-full rounded-md px-2 py-1 text-zinc-800 shadow-sm",
              {
                "bg-red-300": fieldError,
                className,
              },
            )}
          />
        ) : (
          <InputText
            id={id}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            type={type}
            value={fieldValue ?? initialValue}
            className={cn(
              "w-full rounded-md px-2 py-1 text-zinc-800 shadow-sm",
              {
                [className || ""]: className,
                "bg-red-300": fieldError,
                "pr-7": icon,
              },
            )}
          />
        )}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-700">
          {icon}
        </div>
      </span>
      <ErrorMessage
        name={name}
        component="div"
        className="absolute text-sm text-red-400"
      />
    </div>
  );
};

export default Input;
/*
 * DOCS :
 * Represents the generic function for an Input inside a Formik Context
 * Holds the label, input and error message
 * Responsible for rendering the correct styling, mandatory and error informations
 */
