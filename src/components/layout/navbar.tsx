import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link href="/">
          <a>
            <ArrowLeftOutlined />
            Home
          </a>
        </Link>
      </div>
      <div className="navbar__center">
        <p>DX Dashboard</p>
      </div>
      <div className="navbar__right">
        <p>Developed by DX ENGINEER</p>
      </div>
    </div>
  );
};

export default Navbar;
