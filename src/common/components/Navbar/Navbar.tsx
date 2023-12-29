import { Link } from "react-router-dom";
import useAuthApi from "../Auth/data/hooks/useAuth.api";
import NavbarLogo from "./NavbarLogo";
import NavbarUser from "./NavbarUser/NavbarUser";

const Navbar = () => {
  const { isAuthenticated } = useAuthApi();

  if (!isAuthenticated) return <></>;

  return (
    <div className="pt-16">
      <div className="fixed left-0 top-0 z-20 flex w-full items-center justify-between bg-zinc-700 p-2 shadow-sm shadow-indigo-500">
        <NavbarLogo />
        <div className="flex items-center gap-x-6">
          <Link className="hover:text-indigo-300" to={"/calendar"}>
            Calendar
          </Link>
          <NavbarUser />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
