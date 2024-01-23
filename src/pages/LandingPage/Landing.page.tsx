import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Link to="/calendar" className="text-2xl">
      Navigate to <span className="text-indigo-400">calendar</span>
    </Link>
  );
};

export default LandingPage;
/*
 * DOCS :
 * Represents the homepage
 */
