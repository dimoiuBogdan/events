export type ForgotPasswordModalType = {
  email: string;
};

export type ForgotPasswordNewModalType = {
  password: string;
  repeat_password: string;
};

export type ForgotPasswordNewModalParamsType = {
  password: string;
  resetToken: string;
};
