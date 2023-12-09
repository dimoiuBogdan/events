import dayjs from "dayjs";
import { FC } from "react";

type Props = {
  from: Date;
  name: string;
  to: Date;
};
const Event: FC<Props> = ({ name, from, to }) => {
  const formatDate = (date: Date) => dayjs(date).format("HH:mm");

  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md bg-indigo-400 px-4 py-1 shadow-md hover:bg-indigo-500">
      <div>
        {formatDate(from)} - {formatDate(to)}
      </div>
      <div>{name}</div>
    </div>
  );
};

export default Event;
