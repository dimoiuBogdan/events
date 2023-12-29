import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROMANIAN_PHONE_NUMBER_REGEX } from "../constants";

export const isRomanianPhoneNumber = (phoneNumber: string) => {
  const regex = ROMANIAN_PHONE_NUMBER_REGEX;

  return regex.test(phoneNumber);
};

export const formatEmptyValue = (value: string | undefined | null) => {
  return value || "-";
};

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  const itemExists = !!localStorage.getItem(key);

  if (itemExists) {
    localStorage.removeItem(key);
  }
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
