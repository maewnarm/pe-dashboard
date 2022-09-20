import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  function onEnter(e: React.MouseEvent) {
    e.currentTarget.classList.add("animate__bounce");
  }

  function onLeave(e: React.MouseEvent) {
    e.currentTarget.classList.remove("animate__bounce");
  }

  return (
    <div className="main">
      <div className="link animate__bounceIn">
        <Link href="/main">Center Dashboard</Link>
        <Link href="/lotqc">
          <a onMouseEnter={(e) => onEnter(e)} onMouseLeave={(e) => onLeave(e)}>
            DX Lot Quality Check
          </a>
        </Link>
        <Link href="/fmoe">5M1E Report System</Link>
      </div>
    </div>
  );
};

export default Home;
