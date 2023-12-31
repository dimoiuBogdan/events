import { Tooltip } from "primereact/tooltip";
import { FC } from "react";
import { cn } from "../../../../../../common/data/helpers/helpers";

type Props = {
  backgroundColor: string;
  content: string;
  disabled?: boolean;
  onClick: () => void;
  tooltipMessage?: string;
};
const EventModalActionButton: FC<Props> = ({
  backgroundColor,
  content,
  disabled,
  onClick,
  tooltipMessage,
}) => {
  const className = cn(
    "cursor-pointer rounded-md px-4 bg-opacity-80 py-2 text-center text-sm shadow-sm hover:bg-opacity-100",
    backgroundColor,
    disabled && "bg-zinc-600 bg-opacity-50 cursor-default",
    disabled && tooltipMessage && "w-full",
  );

  const handleOnClick = () => {
    if (disabled) return;

    onClick();
  };

  return (
    <>
      <button
        disabled={disabled}
        id={content}
        onClick={handleOnClick}
        className={className}
      >
        {content}
      </button>
      {!!tooltipMessage && (
        <Tooltip
          showOnDisabled
          position="bottom"
          className="text-xs"
          content={tooltipMessage}
          target={`#${content}`}
        />
      )}
    </>
  );
};

export default EventModalActionButton;
