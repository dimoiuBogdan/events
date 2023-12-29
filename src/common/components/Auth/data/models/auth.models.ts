export type AuthModalRegisterType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
};

export type AuthModalLoginType = {
  email: string;
  password: string;
};

export type AuthUserReturnType = {
  id: number;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthTokensType = {
  accessToken: string;
  refreshToken: string;
};
