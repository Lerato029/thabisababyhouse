/* ============================================Navbar Component================================== */
/* Data context*/
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

//routing
import Link from "next/link";
import { useRouter } from "next/router";

//where refresh token is stored
import Cookie from "js-cookie";

//import logo
const logo = "images/logo.png";

const NavBar = () => {
  //initiate router
  const router = useRouter();

  //state and dispatch to update it
  const { state, dispatch } = useContext(DataContext);

  //state property
  const { auth } = state;

  //==================================================================Main Functionality
  //function to change className of links
  const isActive = (r) => {
    //if on same page as link href
    if (router.pathname === r) {
      //assign className:
      return "nav-link active";
    } else {
      //assign className:
      return "nav-link";
    }
  };

  const handleLogOut = () => {
    //removing data from local storage and cookies to on user out
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");

    //reset auth state property
    dispatch({ type: "AUTH", payload: {} });

    //notification of successful log out
    dispatch({ type: "NOTIFY", payload: { success: "Successful log out" } });
    return router.push(`/`);
  };

  //admin features - direct to create product page
  const adminRouter = () => {
    return (
      <>
        <Link href="/create">
          <a className="dropdown-item">Create Product</a>
        </Link>
      </>
    );
  };

  //function returns the logged in nav item if admin feature above added too
  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={auth.user.avatar}
            alt="User's Avatar"
            style={{
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              transform: "translateY(-3px",
              marginRight: "3px",
            }}
            className="w-2"
          />
          {auth.user.name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <Link href="/profile">
              <a className="dropdown-item">Profile</a>
            </Link>
            {auth.user.role === "admin" && adminRouter()}
            <div className="dropdown-divider"></div>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </li>
    );
  };

  //navbar and links
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <img
              src={logo}
              alt=""
              height="30"
              className="d-inline-block align-text-top"
            />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {Object.keys(auth).length === 0 ? (
              <li className="nav-item">
                <Link href="/signin">
                  <a className={isActive("/signin")}>
                    <i className="far fa-user" aria-hidden="true"></i> Sign In
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}

            <li className="nav-item"></li>
            <li className="nav-item">
              <Link href="/">
                <a className={isActive("/")}>Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className={isActive("/about")}>About</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/shop">
                <a className={isActive("/shop")}>Shop</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/donate">
                <a className={isActive("/donate")}>Donate</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/enlist">
                <a className={isActive("/enlist")}>Enlist</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
