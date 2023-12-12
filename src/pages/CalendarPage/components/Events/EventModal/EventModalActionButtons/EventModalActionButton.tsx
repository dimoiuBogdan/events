import { FC } from "react";
import { cn } from "../../../../../../common/data/utils";

type Props = {
  content: string;
  onClick: () => void;
  backgroundColor: string;
};
const EventModalActionButton: FC<Props> = ({
  content,
  backgroundColor,
  onClick,
}) => {
  const className = cn(
    "w-1/5 cursor-pointer rounded-md bg-opacity-80 py-2 text-center text-sm shadow-sm hover:bg-opacity-100",
    backgroundColor,
  );

  return (
    <div onClick={onClick} className={className}>
      {content}
    </div>
  );
};

export default EventModalActionButton;
