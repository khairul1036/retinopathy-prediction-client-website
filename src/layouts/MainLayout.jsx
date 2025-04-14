import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-t-background">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
