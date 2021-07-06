import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";

export default function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  console.log(state);
  const { auth } = state;

  const isActive = (r) => {
    if (router.pathname === r) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  };

  //function returns the logged in nav item
  const loggedRouter = () => {
    return (
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img scr={auth.user.avatar} alt={auth.user.avatar} />
          {auth.user.name}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </li>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Thabisa Baby House</a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
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
          <li className="nav-item ">
            <Link href="/cart">
              <a className={isActive("/cart")}>
                <i class="fab fa-opencart" aria-hidden="true"></i> Cart
              </a>
            </Link>
          </li>
          {Object.keys(auth).length === 0 ? (
            <li className="nav-item ">
              <Link href="/signin">
                <a className={isActive("/signin")}>
                  <i class="far fa-user" aria-hidden="true"></i> Sign In
                </a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
    </nav>
  );
}
