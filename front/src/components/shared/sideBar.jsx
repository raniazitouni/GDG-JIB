import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "/Assets/Logo.svg";
import Grid from "/Assets/grid-4.svg";
import Grid2 from "/Assets/grid-2.svg";
import Add from "/Assets/add.svg";
import Add2 from "/Assets/add2.svg";
import Settings from "/Assets/settings.svg";
import Settings2 from "/Assets/setting2.svg";
import Profilicon from "/Assets/Profil.svg";
import Profilicon2 from "/Assets/profil2.svg";
import LogOut from "/Assets/logOut.svg";
import LogOut2 from "/Assets/logOut2.svg";

import { useNavigate } from "react-router-dom";

const SideBar = ({ Role }) => {
  const navigate = useNavigate();
  let list = [];

  switch (Role) {
    case "Club":
      list = [
        { name: "Events", page: "/events", icon: Grid2, icon2: Grid },
        { name: "Add event", page: "/add-event", icon: Add, icon2: Add2 },
        {
          name: "Settings",
          page: "/settings",
          icon: Settings,
          icon2: Settings2,
        },
      ];
      break;

    case "user":
      list = [
        { name: "Events", page: "/events", icon: Grid2, icon2: Grid },
        { name: "Opportunities", page: "/opportunities" },
        {
          name: "Settings",
          page: "/settings",
          icon: Settings,
          icon2: Settings2,
        },
      ];
      break;

    default:
      list = [
        { name: "Events", page: "/events", icon: Grid2, icon2: Grid },
        { name: "Add event", page: "/add-event", icon: Add, icon2: Add2 },
        {
          name: "Settings",
          page: "/settings",
          icon: Settings,
          icon2: Settings2,
        },
      ];
  }

  const [active, setActive] = useState("/events");

  const liststatic = [
    { name: "Profil", page: "/profil", icon: Profilicon , icon2 : Profilicon2},
    { name: "Log Out", page: null, icon: LogOut , icon2: LogOut2},
  ];

  return (
    <div className="flex flex-col justify-between bg-white w-64 h-screen px-3 py-6 ">
      <img src={Logo} alt="Logo" className="w-56 h-24 object-contai px-6" />
      <div className="flex flex-col gap-y-3">
        {list.map((item, index) => (
          <div
            key={index}
            className={`flex flex-row rounded-lg w-full px-3.5 py-3 hover:cursor-pointer ${
              active == item.page
                ? "bg-BlueA text-white"
                : "bg-WhiteC text-BlueA"
            }`}
            onClick={() => {
              setActive(item.page);
              navigate(item.page);
            }}
          >
            <img
              src={active == item.page ? item.icon2 : item.icon}
              alt={item.name}
              className="w-10 h-10 object-contain px-2"
            />
            <div className="font-bold text-lg py-1.5">{item.name}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-16 gap-y-3">
        {liststatic.map((item, index) => (
          <div
            key={index}
            className={`flex flex-row rounded-lg w-full px-3.5 py-3 hover:cursor-pointer ${
              active == item.page
                ? "bg-BlueA text-white"
                : "bg-WhiteC text-BlueA"
            }`}
            onClick={() => {
              setActive(item.page);
              navigate(item.page);
            }}
          >
            <img
              src={active == item.page ? item.icon2 : item.icon}
              alt={item.name}
              className="w-10 h-10 object-contain px-2"
            />
            <div className="font-bold text-lg py-1.5">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

SideBar.propTypes = {
  Role: PropTypes.string.isRequired,
};

export default SideBar;