import "./Header.css";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../Services/CartContext";

function Header() {
  const { cart, removeFromCart } = useContext(CartContext); // גישה לעגלה והסרת פריטים
  const [isCartOpen, setIsCartOpen] = useState(false); // שליטה על פתיחת ה-dropdown
  const [cartItems, setCartItems] = useState(cart); // שמירה על רשימת המוצרים הדרופדאון
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // שליטה על פתיחת ה-dropdown של היוזר

  // עדכון ה-cartItems בכל פעם שה-cart משתנה
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // חישוב הסכום הכולל
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="header">
      <nav
        className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
        id="templatemo_nav_top"
      >
        <div className="container text-light">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa fa-envelope mx-2"></i>
              <a
                className="navbar-sm-brand text-light text-decoration-none"
                href="mailto:info@company.com"
              >
                info@company.com
              </a>
              <i className="fa fa-phone mx-2"></i>
              <a
                className="navbar-sm-brand text-light text-decoration-none"
                href="tel:010-020-0340"
              >
                010-020-0340
              </a>
            </div>
            <div>
              <a
                className="text-light"
                href="https://fb.com/templatemo"
                target="_blank"
                rel="sponsored"
              >
                <i className="fab fa-facebook-f fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://www.instagram.com/"
                target="_blank"
              >
                <i className="fab fa-instagram fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://twitter.com/"
                target="_blank"
              >
                <i className="fab fa-twitter fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://www.linkedin.com/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-sm fa-fw"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <a
            className="navbar-brand text-success logo h1 align-self-center"
            href="/"
          >
            Zay
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="About">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="Products">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="ContactUs">
                    ContactUs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="Dashboard">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div className="navbar align-self-center d-flex">
              <div className="cart-icon position-relative">
                <a
                  className="nav-icon position-relative text-decoration-none"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCartOpen(!isCartOpen);
                  }}
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    {cart.length}
                  </span>
                </a>
                {isCartOpen && (
                  <div className="cart-dropdown">
                    <ul className="cart-items">
                      {cart.map((item) => (
                        <li key={item.id} className="cart-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                          />
                          <div className="cart-item-details">
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                          </div>
                          <button
                            className="remove-item-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total">
                      <p>Total: ${totalPrice.toFixed(2)}</p>
                    </div>
                    {cart.length > 0 && (
                      <div className="checkout-btn-container">
                        <a href="/Cart" className="btn btn-primary">
                          Checkout
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="user-icon position-relative">
                <a
                  className="nav-icon position-relative text-decoration-none"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  }}
                >
                  <i className="fa fa-fw fa-user text-dark mr-3"></i>
                </a>
                {isUserDropdownOpen && (
                  <div className="user-dropdown">
                    <ul className="user-options">
                      <li>
                        <a href="/profile">Profile</a>
                      </li>
                      <li>
                        <a href="/orders">Orders</a>
                      </li>
                      <li>
                        <a href="/logout">Logout</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;