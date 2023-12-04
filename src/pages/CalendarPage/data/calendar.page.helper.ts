import dayjs from "dayjs";
import { CalendarDayType } from "./calendar.page.models";

export const getDaysOfMonth = (
  month: number = dayjs().month(),
  year: number = dayjs().year(),
): CalendarDayType[][] => {
  if (year <= 0) {
    throw new Error("Invalid year value. Year should be a positive number.");
  }

  const firstDayOfTheMonth = dayjs(new Date(year, month)).day();
  const daysInMonth = dayjs(new Date(year, month)).daysInMonth();

  const firstDayIsMonday = firstDayOfTheMonth === 1;
  const lastMonday = -(firstDayOfTheMonth - 1);
  const NUMBER_OF_WEEKS = 5;
  const NUMBER_OF_DAYS_IN_WEEK = 7;

  let startingDate = firstDayIsMonday ? 0 : lastMonday;
  const days: CalendarDayType[][] = [];

  for (let i = 0; i < NUMBER_OF_WEEKS; i++) {
    const week: CalendarDayType[] = [];

    for (let j = 0; j < NUMBER_OF_DAYS_IN_WEEK; j++) {
      startingDate++;

      const dateExceedingMonth = startingDate > daysInMonth || startingDate < 1;

      week.push({
        date: dayjs(new Date(year, month, startingDate)),
        isCurrentMonth: !dateExceedingMonth,
      });
    }

    days.push(week);
  }

  return days;
};

export const getShortWeekDaysNames = () => [
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
  "Su",
];

export const getMonthNames = () => [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
