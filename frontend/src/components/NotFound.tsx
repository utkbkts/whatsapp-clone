import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-red-600 text-8xl font-bold">404</h1>
        <h2 className="text-red-400 text-3xl">Page Not Found</h2>
        <Link to="/">
          <span className="text-white font-bold text-2xl bg-black/80 py-2 px-4">
            Go to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
