import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="bg-t-background"><Navbar /></div>
      <div className="bg-t-background">
        <Outlet />
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default MainLayout;
