/* ============================================Layout Component================================== */
import React from "react";

//notify responses to client reqs
import Notify from "./Notify";

//modal for delete buttons
import Modal from "./Modal";

//other components
import Footer from "./Footer";
import NavBar from "./NavBar";

//layout for all pages
const Layout = ({ children }) => {
  return (
    <div className="container-fluid p-0">
      <NavBar />
      <Notify />
      <Modal />
      {children}
      <Footer />
    </div>
  );
}

export default Layout