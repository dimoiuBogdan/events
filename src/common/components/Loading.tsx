import { classNames } from "primereact/utils";
import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  size?: "sm" | "md" | "lg";
};
const Loading: FC<Props> = ({ size = "md" }) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-5 h-5";
      case "md":
        return "w-7 h-7";
      case "lg":
        return "w-10 h-10";
      default:
        return "w-7 h-7";
    }
  };

  return (
    <AiOutlineLoading3Quarters
      className={classNames("h-full animate-spin", getSize())}
    />
  );
};

export default Loading;
/*
 * DOCS :
 * Represents the loading indicator
 * Responsible for displaying the correct sizes
 */
