import { FC, PropsWithChildren } from "react";

type Props = {
  handleCloseModal: () => void;
};
const ModalWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  handleCloseModal,
}) => {
  if (!children) return <></>;

  return (
    <>
      <div
        onClick={handleCloseModal}
        className="fixed left-0 top-0 h-screen w-screen bg-black/50"
      ></div>
      <div className="container absolute left-1/2 top-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-zinc-700 p-6 shadow-md">
        {children}
      </div>
    </>
  );
};

export default ModalWrapper;
