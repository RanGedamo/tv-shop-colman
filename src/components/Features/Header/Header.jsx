// src/components/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  User,
  X,
  LogIn,
  ChevronDown,
} from "lucide-react";
import { useCart } from "./hooks/useCart";
import CartDropdown from "../../Pages/Checkout/CartDropdown";
import { useAuth } from "../../../Contexts/AuthContext";
import LogOutSuccessPopup from "../../PopUps/LogOutSuccessPopup";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [logOutSuccess, setLogOutSuccess] = useState(false);
  // console.log("user :", user);
  console.log("user :", logOutSuccess);

  const handleLogout = async () => {
    try {
     await logout(user.user);
     setUserName(user.user.firstName);
     setLogOutSuccess(true);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  const menuItems = [
    { label: "Account Settings", href: "/account/settings" },
    { label: "Order History", href: "/account/orders" },
    { label: "My Favorites", href: "/account/favorites" },
    { label: "Logout", onClick: handleLogout },    
  ];

  return (
    <header className="bg-white shadow-md">
           {logOutSuccess && <LogOutSuccessPopup userName={userName} />}

      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="border-r border-gray-700 pr-4">
                Customer Service: 1-800-555-555
              </span>
              <span>Free Shipping on Orders Over $5,000</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/track-order" className="hover:text-blue-400">
                Track Order
              </Link>
              <Link to="/store-locator" className="hover:text-blue-400">
                Stores
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TV Shop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                TVs
              </Link>
              <div className="absolute hidden group-hover:block w-48 z-20 bg-white shadow-lg rounded-lg mt-2 py-2">
                <Link
                  to="/products/oled"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  OLED
                </Link>
                <Link
                  to="/products/qled"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  QLED
                </Link>
                <Link
                  to="/products/led"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  LED
                </Link>
              </div>
            </div>
            <Link
              to="/deals"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Deals
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/contactUs"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              contact
            </Link>
            {user?.user?.isAdmin && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                dashboard
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 ">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <Search size={24} />
            </button>
            <Link
              to="/account/favorites"
              className="text-gray-700 hover:text-blue-600"
            >
              <Heart size={24} />
            </Link>
            <div className="relative">
              <button
                className="cart-trigger text-gray-700 hover:text-blue-600 relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart size={26} style={{ marginTop: "6px" }} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <CartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex  items-center text-gray-700 hover:text-blue-600  rounded-md"
                >
                  <span className="pl-5 xs:pl-1 xs:hidden">
                    Hello, {user?.user?.firstName}
                  </span>
                  <div className="xs:pl-6 pl-2 xs:pt-4">
                    <User size={24} />
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <span className="pl-5 xs:pl-1 sm:hidden">
                  Hello, {user?.user?.firstName}
                </span>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {menuItems.map((item, index) =>
                      item.onClick ? (
                        <button
                          key={index}
                          onClick={() => {
                            item.onClick();
                            setIsOpen(false);
                          }}
                          className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={index}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
            {!user && (
              <Link
                to="/Login"
                className="text-gray-700 hover:text-blue-600 flex"
              >
                <p className="lg:pl-2 xs:pl-2 xs:pr-1">
                  <b>L</b>ogin
                </p>
                <LogIn size={24} />
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
              />
              <X
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600"
              >
                TVs
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-blue-600">
                Deals
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link
                to="/contactUs"
                className="text-gray-700 hover:text-blue-600"
              >
                contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
