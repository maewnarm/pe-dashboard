import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { DashboardMenuList } from "statics/organize/menu";

const DashboardMenu = () => {
  const router = useRouter();
  return (
    <div className="dashboard-menu">
      <div className="dashboard-menu__wrapper custom-scrollbar">
        <p>DX applications</p>
        {DashboardMenuList.map((menu) => (
          <div
            className="dashboard-menu__item"
            key={menu.text}
            onClick={() => router.push(menu.link)}
          >
            <span>{menu.text}</span>
            <div className="item-image">
              <Image
                height={130}
                width={130}
                src={menu.pic}
                alt="picture"
                loading="eager"
                layout="fixed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMenu;
