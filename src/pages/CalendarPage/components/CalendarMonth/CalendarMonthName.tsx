import dayjs from "dayjs";
import { useRef, useState } from "react";
import useOnClickOutside from "../../../../common/data/hooks/useOnClickOutside";
import useCalendar from "../../data/hooks/useCalendar";
import CalendarMonthNameList from "./CalendarMonthNameList";

const CalendarMonthName = () => {
  const ref = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const { selectedMonth } = useCalendar();

  const formattedMonth = dayjs().month(selectedMonth).format("MMM. YYYY");

  useOnClickOutside(ref, () => setIsOpened(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className="cursor-pointer"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {formattedMonth}
      </div>
      {isOpened && <CalendarMonthNameList setIsOpened={setIsOpened} />}
    </div>
  );
};

export default CalendarMonthName;
