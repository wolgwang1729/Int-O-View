import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between sm:px-5 md:px-14 lg:px-20 py-6 shadow-md">
      <div className="mb-4 md:mb-0">
        <Link to="/">
          <img className="h-14" src="/logoNew.jpg" alt="Logo" />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Link to="/details_1">
          <div className="flex h-14 justify-center items-center px-4 border-2 font-mono rounded-2xl border-slate-200 text-blue-800 text-center text-base md:text-xl font-bold cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-100">
            <div>Login</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
