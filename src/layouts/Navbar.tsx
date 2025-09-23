import "../styles/navbar.css";
import logo from "../assets/food_palace-transparent.png";
import { Button, Dialog, Divider, IconButton } from "@mui/material";
import { ReactElement, use, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Remove, ShoppingCart } from "@mui/icons-material";
import React from "react";
import { stat } from "fs";

interface Props {
  children: ReactElement;
}

export default function Navbar({ children }: Readonly<Props>) {

  const [cartItems, setCartItems] = React.useState<any[]>([]);

  const [showCart, setShowCart] = React.useState(false);

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

  useEffect(() => {
    // Run once on mount
    handleGetCartItems();

    // Add global click event listener
    const handleClick = () => {
      handleGetCartItems();
    };

    window.addEventListener("click", handleClick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


  const handleGetCartItems = () => {
    const existing = sessionStorage.getItem("plate");
    const plateItems = existing ? JSON.parse(existing) : [];
    setCartItems(plateItems);
  }

  const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const handleOrderNow = () => {
    sessionStorage.removeItem("plate");
    setCartItems([]);
    setShowCart(false);

    const orderId = generateOrderId();

    // Ensure we always get an array
    let existingOrders: any[] = [];
    try {
      const stored = localStorage.getItem("order");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          existingOrders = parsed;
        }
      }
    } catch (err) {
      console.error("Failed to parse existing orders:", err);
    }

    // New order object
    const newOrder = {
      id: orderId,
      items: cartItems,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    // Add new order
    const updatedOrders = [...existingOrders, newOrder];

    // Save back to localStorage
    localStorage.setItem("order", JSON.stringify(updatedOrders));

    alert(
      `Your order has been placed successfully! Your order ID is ${orderId}`
    );
  };


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
              className={`navbar-link ${location.pathname === link.path ? "active" : ""
                }`}
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="plate-button-outer" onClick={() => setShowCart(true)}>
          <div className="cart-item-count">{cartItems.length}</div>
          <ShoppingCart />
        </div>

        <Dialog
          open={showCart}
          onClose={() => setShowCart(false)}
          aria-labelledby="cart-dialog-title"
          aria-describedby="cart-dialog-description"
        >
          <div className="cart-dialog-content">
            <h2 id="cart-dialog-title">Your Plate</h2>
            <Divider />
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div style={{ display: "flex", justifyContent: "space-between" }} key={index}>
                  <div key={index} className="cart-item">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-size">{item.selectedSize === "smallprice" ? "Small" : item.selectedSize === "mediumprice" ? "Medium" : "Large"}</div>
                    <div className="cart-item-price">LKR.{item.price === "" ? item[item.selectedSize] : item.price}</div>
                  </div>

                  <IconButton
                    onClick={() => {
                      const newItems = cartItems.filter((_, i) => i !== index);
                      setCartItems(newItems);
                      sessionStorage.setItem("plate", JSON.stringify(newItems));
                    }}
                  >
                    <Remove />
                  </IconButton>
                </div>
              ))}
            </div>
            <Divider />
            <div style={{ textAlign: "right" }}>Total: LKR.{cartItems.reduce((acc, item) => acc + (item.price === "" ? item[item.selectedSize] : item.price), 0)}</div>
            <div style={{ display: "flex", justifyContent: "space-arround", marginTop: "20px", alignItems: "center" }}>
              <Button
                variant="outlined"
                color="secondary"
                className="secondary-button"
                onClick={() => {
                  sessionStorage.removeItem("plate");
                  setCartItems([]);
                  setShowCart(false);
                }}
              >
                Clear Plate
              </Button>
              <div style={{ flex: 1 }}></div>
              <Button
                className="primary-button"
                variant="contained"
                color="primary"
                onClick={() => handleOrderNow()}
              >
                Order
              </Button>
            </div>
            <div style={{ height: "20px" }}></div>
          </div>
        </Dialog>
      </div>
      {children}
    </>
  );
}
