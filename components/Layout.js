import React from "react";
import Notify from "./Notify";
import Modal from "./Modal";
import Footer from "./Footer";
import NavBar from "./NavBar";
export default function Layout({ children }) {
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
