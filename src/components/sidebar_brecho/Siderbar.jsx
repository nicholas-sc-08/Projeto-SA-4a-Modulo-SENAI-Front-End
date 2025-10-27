"use client";

import React, { useState } from "react";
import Styles from "@/components/sidebar_brecho/Siderbar.module.css";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "/img/icons/DashboardIcon.svg" },
    { name: "Cadastrar", icon: "/img/icons/CadastrarIcon.svg" },
    { name: "Estoque", icon: "/img/icons/EstoqueIcon.svg" },
    { name: "Eventos", icon: "/img/icons/EventosIcon.svg" },
  ];

  return (
    <div className={Styles.wrapper}>
      {/* Logo fora da sidebar */}
      <div className={Styles.logo}>
        <img
          src="/img/icons/Butterfly.svg"
          alt="Fly Logo"
          className={Styles.logoIcon}
        />
        <h1 className={Styles.logoText}>FLY</h1>
      </div>

      {/* Sidebar */}
      <div className={Styles.sidebar}>
        <ul className={Styles["sidebar-menu"]}>
          {menuItems.map((item, i) => (
            <li
              key={i}
              className={`${Styles.item} ${
                active === item.name ? Styles.active : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              <img src={item.icon} alt={item.name} className={Styles.icon} />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        <div
          className={`${Styles["sidebar-footer"]} ${
            active === "Home" ? Styles.active : ""
          }`}
          onClick={() => setActive("Home")}
        >
          <img
            src="/img/icons/HomeIcon.png"
            alt="Home"
            className={Styles.icon}
          />
          <span>Home</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
