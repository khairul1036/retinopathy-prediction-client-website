import React from "react";
import useAuth from "../../hook/useAuth";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userGoogleLogin, user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const data = await userGoogleLogin();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/detection"}>Detection</NavLink>
      </li>
      <li>
        <NavLink to={"/profile"}>Profile</NavLink>
      </li>
      {user ? (
        <li>
          <button onClick={logOut}>Logout</button>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <>
      <div className="navbar max-w-screen-2xl bg-base-100 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="px-5 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="font-bold text-2xl">
            Logo
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <img
                src={user?.photoURL}
                alt={user.displayName}
                className="w-14 h-14 rounded-full border-2 border-orange-500"
              />
            </div>
          ) : (
            <button onClick={handleGoogleSignIn} className="btn">
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
