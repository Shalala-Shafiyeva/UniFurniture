import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { refresh } from "aos";

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const queryClient = useQueryClient();
  // Fetch count of products in the cart
  const { data: count = 0 } = useQuery("cartCount", async () => {
    const response = await fetch(
      "http://localhost:8000/api/basket/productQty",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    return result.data || 0;
  });

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
    setOpenBasket(!openBasket);
  };
  return (
    <header>
      <div className="cover">
        <Link to="/" className="logo">
          <img src="/images/Logo.png" alt="Logo" />
          <span>UniFurniture</span>
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Əsas Səhifə</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Alış-veriş</NavLink>
            </li>
            <li>
              <NavLink to="/about">Haqqımızda</NavLink>
            </li>
            <li>
              <NavLink to="/services">Xidmətlər</NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink to="/my-orders">Sifarişlər</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="btns">
          <div className="registerBtns">
            {!isAuthenticated ? (
              <>
                <Link id="login" to="/login">
                  Daxil Ol
                </Link>
                <Link id="register" to="/register">
                  Qeydiyyat
                </Link>
              </>
            ) : (
              <button id="logout" onClick={handleLogout}>
                Çıxış
              </button>
            )}
          </div>
          <div className="menuBar" onClick={handleOpenMenu}>
            <img src="/images/menu.png" alt="Menu" />
          </div>
          {!isAuthenticated ? (
            <NavLink id="mobileLogin" to="/login">
              Daxil ol
            </NavLink>
          ) : (
            <NavLink id="mobileLogout" onClick={handleLogout}>
              Çıxış
            </NavLink>
          )}
          <div className="basket" onClick={() => handleOpenBasket()}>
            <img src="/images/basketicon.png" alt="Basket" />
            {/* without backend */}
            {/* <span>{cart.length}</span> */}
            {/* with backend */}
            <span>{count}</span>
          </div>
        </div>
      </div>
      <div className={`navBar ${openMenu ? "open" : ""}`}>
        <div className="closeBtn">
          <span onClick={() => setOpenMenu(false)}>x</span>
        </div>
        <ul>
          <li>
            <NavLink to="/">Əsas Səhifə</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Alış-veriş</NavLink>
          </li>
          <li>
            <NavLink to="/about">Haqqımızda</NavLink>
          </li>
          <li>
            <NavLink to="/services">Xidmətlər</NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/my-orders">Sifarişlər</NavLink>
            </li>
          )}
        </ul>
      </div>
      {openBasket ? (
        <Cart openBasket={openBasket} setOpenBasket={setOpenBasket} />
      ) : null}
    </header>
  );
}

export default Header;
