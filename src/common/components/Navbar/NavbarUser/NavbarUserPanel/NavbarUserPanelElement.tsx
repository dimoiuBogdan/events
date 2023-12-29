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
      className="flex cursor-pointer items-center gap-x-2 hover:text-indigo-400 text-lg"
    >
      {icon} {content}
    </div>
  );
};

export default NavbarUserPanelElement;
