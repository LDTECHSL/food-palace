import "../styles/navbar.css";
import logo from "../assets/food_palace-transparent.png"
import { Divider } from "@mui/material";
import Home from "../pages/Home";

export default function Navbar() {
    return (
        <>
            <div className="navbar-outer">
                <div className="navbar-logo-inner">
                    <img className="navbar-logo" src={logo} alt="Food Palace Logo" />
                </div>

                <Divider />

                <div className="navbar-links-inner">
                    <a className="navbar-link" href="#">Breakfast</a>
                    <a className="navbar-link" href="#">Lunch</a>
                    <a className="navbar-link" href="#">Dinner</a>
                    <a className="navbar-link" href="#">Bakery</a>
                    <a className="navbar-link" href="#">Drinks</a>
                    <a className="navbar-link" href="#">Deserts</a>
                    <a className="navbar-link" href="#">Orders</a>
                </div>

            </div>
            <Home />
        </>
    )
}