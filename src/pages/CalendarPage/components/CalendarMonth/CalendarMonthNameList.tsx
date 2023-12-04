import { Dispatch, FC, SetStateAction } from "react";
import { cn } from "../../../../common/data/utils";
import { getMonthNames } from "../../data/calendar.page.helper";
import useCalendar from "../../data/hooks/useCalendar";

type Props = {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};
const CalendarMonthNameList: FC<Props> = ({ setIsOpened }) => {
  const { handleChangeMonth, selectedMonth } = useCalendar();

  const months = getMonthNames();

  const isActiveMonth = (activeMonth: number) => selectedMonth === activeMonth;

  const handleSelectedMonth = (month: number) => {
    handleChangeMonth(month);

    setIsOpened(false);
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 transform overflow-hidden rounded-md bg-white shadow-lg">
      {months.map((month, index) => (
        <div
          onClick={() => handleSelectedMonth(index)}
          key={index}
          className={cn(
            "cursor-pointer px-3 py-1 hover:bg-indigo-100",
            isActiveMonth(index) ? "bg-indigo-400 text-white" : "",
          )}
        >
          {month}
        </div>
      ))}
    </div>
  );
};

export default CalendarMonthNameList;