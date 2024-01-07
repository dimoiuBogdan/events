export const BASE_API_URL = import.meta.env.VITE_API_ENDPOINT;

export const TWILIO = {
  FROM: "+19418765086",
  TO: "+40727892022",
};

export const MAX_TITLE_WIDTH = 130;

export const ROMANIAN_PHONE_NUMBER_REGEX = /^(\+4|0)(\d{9})$/;

export const MAX_INPUT_LENGTHS = {
  MEDIUM: 50,
  LONG: 100,
  SHORT: 25,
};
