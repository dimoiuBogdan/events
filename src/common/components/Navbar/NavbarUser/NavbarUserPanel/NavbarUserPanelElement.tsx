import { FC, ReactElement } from "react";

type Props = {
  content: string;
  icon: ReactElement;
  action: () => void;
};
const NavbarUserPanelElement: FC<Props> = ({ action, content, icon }) => {
  return (
    <div
      onClick={action}
      className="flex cursor-pointer items-center gap-x-2 text-lg hover:text-indigo-400"
    >
      {icon} {content}
    </div>
  );
};

export default NavbarUserPanelElement;
/*
 * DOCS :
 * Represents a single element of the navbar user panel
 * Responsible for handling functionality and display data
 */
