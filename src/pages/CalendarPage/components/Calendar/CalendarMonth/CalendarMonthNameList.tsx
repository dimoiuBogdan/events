import { Dispatch, FC, SetStateAction } from "react";
import { cn } from "../../../../../common/data/helpers/helpers";
import { getMonthNames } from "../../../data/helpers/calendar.page.helper";
import useCalendar from "../../../data/hooks/useCalendar";

type Props = {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};
const CalendarMonthNameList: FC<Props> = ({ setIsOpened }) => {
  const { handleChangeSelectedDate, selectedDate } = useCalendar();

  const months = getMonthNames();

  const isActiveMonth = (activeMonth: number) =>
    selectedDate.month === activeMonth;

  const handleChangeMonth = (month: number) => {
    handleChangeSelectedDate({
      month,
      year: selectedDate.year,
    });

    setIsOpened(false);
  };

  return (
    <div className="absolute left-1/2 z-10 -translate-x-1/2 transform overflow-hidden rounded-md bg-zinc-700 shadow-lg">
      {months.map((month, index) => (
        <div
          onClick={() => handleChangeMonth(index)}
          key={index}
          className={cn(
            "cursor-pointer px-3 py-1 hover:bg-indigo-400",
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
/*
 * DOCS :
 * Represents the list of months in current year
 * Responsible for navigating between months
 * Responsible for highlighting the selected month
 */
