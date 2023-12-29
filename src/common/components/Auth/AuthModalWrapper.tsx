import { FC, PropsWithChildren } from "react";

const AuthModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full max-w-lg flex-col items-center rounded-md bg-zinc-700 p-6 shadow-md">
      {children}
    </div>
  );
};

export default AuthModalWrapper;
