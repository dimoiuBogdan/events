import dayjs from "dayjs";
import { useRef, useState } from "react";
import useOnClickOutside from "../../../../../common/data/hooks/useOnClickOutside";
import useCalendar from "../../../data/hooks/useCalendar";
import CalendarMonthNameList from "./CalendarMonthNameList";

const CalendarMonthName = () => {
  const ref = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const { selectedDate, formatDate } = useCalendar();

  const getFormattedMonth = () => {
    const monthAndYear = dayjs()
      .month(selectedDate.month)
      .year(selectedDate.year);

    const formattedMonth = formatDate(monthAndYear.toString(), "MMM. YYYY");

    return formattedMonth;
  };

  useOnClickOutside(ref, () => setIsOpened(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className="cursor-pointer"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {getFormattedMonth()}
      </div>
      {isOpened && <CalendarMonthNameList setIsOpened={setIsOpened} />}
    </div>
  );
};

export default CalendarMonthName;
/*
 * DOCS :
 * Represents the selected month, and provides the list of months
 * Responsible for toggling the list of months
 */
