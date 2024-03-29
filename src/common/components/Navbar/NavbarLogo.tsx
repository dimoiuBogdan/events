import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Link
      to={"/"}
      className="text-lg font-medium uppercase tracking-wider hover:text-indigo-300"
    >
      Bobivents
    </Link>
  );
};

export default NavbarLogo;
/*
 * DOCS :
 * Represents the app logo inside the navbar
 * Responsible for redirecting to homepage
 */
