import { OverlayPanel } from "primereact/overlaypanel";
import { FC, RefObject } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../../../../../routes/routes";
import useAuthApi from "../../../Auth/data/hooks/useAuth.api";
import NavbarUserPanelElement from "./NavbarUserPanelElement";

type Props = {
  op: RefObject<OverlayPanel>;
};
const NavbarUserPanel: FC<Props> = ({ op }) => {
  const navigate = useNavigate();
  const { logoutUserRequest } = useAuthApi();

  const handleClosePanel = () => {
    if (op) op.current?.hide();
  };

  const handleLogoutUser = () => {
    logoutUserRequest.mutate();

    handleClosePanel();
  };

  const handleRedirectToProfile = () => {
    navigate(PROFILE_ROUTE);

    handleClosePanel();
  };

  return (
    <OverlayPanel
      className="w-max bg-zinc-700 text-zinc-200 shadow-md"
      appendTo="self"
      ref={op}
    >
      <div className="flex flex-col gap-y-4">
        <NavbarUserPanelElement
          content="View profile"
          icon={<FaUser />}
          action={handleRedirectToProfile}
        />
        <NavbarUserPanelElement
          content="Logout"
          icon={<FaLock />}
          action={handleLogoutUser}
        />
      </div>
    </OverlayPanel>
  );
};

export default NavbarUserPanel;
