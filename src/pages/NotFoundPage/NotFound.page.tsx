import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="centered-page flex-col gap-y-4 text-3xl text-zinc-100">
      <div>
        <span className="text-indigo-300">Oops!</span> You found a page that
        doesn't exist.
      </div>
      <div className="text-lg text-zinc-300">
        The page you looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </div>
      <button
        onClick={() => navigate("/")}
        className="mr-auto mt-4 w-fit rounded-md bg-indigo-500 px-5 py-1.5 text-lg shadow-sm hover:bg-indigo-600"
      >
        Go To Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
