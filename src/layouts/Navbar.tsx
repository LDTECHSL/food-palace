import "../styles/navbar.css";
import logo from "../assets/food_palace-transparent.png";
import { Divider } from "@mui/material";
import { ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactElement;
}

export default function Navbar({ children }: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Breakfast", path: "/breakfast" },
    { name: "Lunch", path: "/lunch" },
    { name: "Dinner", path: "/dinner" },
    { name: "Bakery", path: "/bakery" },
    { name: "Drinks", path: "/drinks" },
    { name: "Deserts", path: "/deserts" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <>
      <div className="navbar-outer">
        <div className="navbar-logo-inner">
          <img
            style={{ cursor: "pointer" }}
            className="navbar-logo"
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            alt="Food Palace Logo"
          />
        </div>

        <Divider />

        <div className="navbar-links-inner">
          {links.map((link) => (
            <a
              key={link.path}
              className={`navbar-link ${
                location.pathname === link.path ? "active" : ""
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      {children}
    </>
  );
}
