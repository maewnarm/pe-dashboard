import React from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="children">{children}</div>
    </div>
  );
};

export default Layout;
