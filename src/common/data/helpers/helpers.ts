export const isRomanianPhoneNumber = (phoneNumber: string) => {
  const regex = /^(\+4|0)(\d{9})$/;

  return regex.test(phoneNumber);
};
