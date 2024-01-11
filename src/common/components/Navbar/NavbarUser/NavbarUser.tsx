import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import UserInitials from "../../User/UserInitials";
import NavbarUserPanel from "./NavbarUserPanel/NavbarUserPanel";

const NavbarUser = () => {
  const op = useRef<OverlayPanel>(null);

  const handleTogglePanel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    op?.current?.toggle(e);

  return (
    <>
      <UserInitials onClick={handleTogglePanel} />
      <NavbarUserPanel op={op} />
    </>
  );
};

export default NavbarUser;
/*
 * DOCS :
 * Represents the user section inside the navbar
 * Holds the user initials
 * Holds the user panel
 * Responsible for toggling the user panel
 */
