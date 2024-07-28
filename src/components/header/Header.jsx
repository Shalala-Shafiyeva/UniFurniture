import React, { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";

function Header() {
  const { cart } = useSelector((state) => state.cart);
  const [openMenu, setOpenMenu] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenBasket = () => {
    if (openMenu) {
      setOpenMenu(false);
    }
    setOpenBasket(true);
  };
  console.log(openBasket)
  return (
    <header>
      <div className="logo">
        <img src="/images/Logo.png" alt="Logo" />
        <span>UniFurniture</span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
      <div className="btns">
        <div className="registerBtns">
          <Link id="login" to="/login">
            Login
          </Link>
          <Link id="register" to="/register">
            Sign Up
          </Link>
        </div>
        <div className="menuBar" onClick={handleOpenMenu}>
          <img src="/images/menu.png" alt="Menu" />
        </div>
        <NavLink id="mobileLogin" to="/login">
          Login
        </NavLink>
        <div
          className="basket"
          onClick={() => {
            if (!openBasket) {
              handleOpenBasket();
            }
          }}
        >
          <img src="/images/basketicon.png" alt="Basket" />
          <span>{cart.length}</span>
        </div>
      </div>
      <div className={`navBar ${openMenu ? "open" : ""}`}>
        <div className="closeBtn">
          <span onClick={() => setOpenMenu(false)}>x</span>
        </div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      {openBasket ? <Cart /> : null}
    </header>
  );
}

export default Header;
