import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-2">
      <Link to="/" className="logo font-bold">
        My Blog
      </Link>
      <nav className="flex gap-[15px]">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/login"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
