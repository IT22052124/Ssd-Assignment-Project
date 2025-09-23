import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../../Shared/Components/context/authcontext";
import "./CHeader.css";
import ViewCustomer from "../../../Customer/ViewCustomer";

const CustomerHeader = (props) => {
  const navigate = useNavigate();
  const [count, setCount] = useState();
  const auth = useContext(AuthContext);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [customer, setCustomer] = useState();

  const toggleProfile = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const navigateCart = () => {
    navigate("/Cart");
  };
  const navigateFaq = () => {
    navigate("/faqs");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/list/${auth.cusId}`)
      .then((response) => {
        setCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching cart", error);
      });
  }, [auth.cusId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/${auth.cusId}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer", error);
      });
  }, [auth.cusId]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsProfileDropdown(false);
      }
    };

    if (isProfileDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProfileDropdown]);

  const logout = () => {
    localStorage.clear();
    auth.logout();
    navigate("/");
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <nav className="px-6 flex justify-between items-center bg-white h-16 border-b-2 shadow-sm">
          {/* Logo */}
          <ul className="flex items-center gap-2">
            <Link to="/products" className="flex items-center gap-2">
              <li className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
                <img
                  className="h-8 w-8"
                  src="/IMG/LOGO.png"
                  alt="Dedsec logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-orange-600 dark:text-white">
                  Kandurata Glass House
                </span>
              </li>
            </Link>
          </ul>

          {/* Page Title */}
          <ul className="flex items-center">
            <li>
              <h1 className="text-gray-700 font-bold text-lg">{props.title}</h1>
            </li>
          </ul>

          {/* Right Section */}
          <ul className="flex items-center gap-4">
            {/* Cart */}
            <li className="relative">
              <button
                onClick={navigateCart}
                type="button"
                className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition"
              >
                <FaCartShopping size={22} />
                {count !== 0 && (
                  <span className="absolute -top-1 -right-1">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold bg-red-500 text-white shadow">
                      {count}
                    </div>
                  </span>
                )}
              </button>
            </li>

            {/* FAQ */}
            <li className="relative">
              <button
                onClick={navigateFaq}
                type="button"
                className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition"
              >
                <FaQuestionCircle size={22} />
              </button>
            </li>

            {/* Profile */}
            <li ref={buttonRef} onClick={toggleProfile} className="relative">
              <div className="flex items-center gap-3 hover:cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition">
                <span className="hidden lg:block text-right">
                  <span className="block text-sm font-medium text-black hover:text-blue-gray-800">
                    {customer?.name}
                  </span>
                </span>
                <span>
                  <img
                    src={
                      customer?.image?.startsWith("http")
                        ? customer.image
                        : `http://localhost:5000/${customer?.image}`
                    }
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover shadow"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
                    }}
                  />
                </span>
                <svg
                  className={`hidden fill-current sm:block transition-transform ${
                    isProfileDropdown && "rotate-180"
                  }`}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                  ></path>
                </svg>
              </div>

              {/* Dropdown */}
              {isProfileDropdown && (
                <div
                  ref={dropdownRef}
                  className={`absolute z-40 right-0 mt-2 w-64 flex flex-col rounded-lg border border-stroke bg-white shadow-lg dropdownProfile ${
                    isProfileDropdown ? "dropdownProfile-visible" : ""
                  }`}
                >
                  <div className="text-xs font-bold px-4 py-2 uppercase text-gray-400 text-center border-b">
                    Welcome!
                  </div>

                  <ul className="flex flex-col gap-3 px-6 py-4">
                    <li>
                      <Link
                        to="/Customer/view/"
                        className="flex items-center gap-3 text-sm font-medium hover:text-orange-500 transition"
                      >
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 22 22"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499Z"></path>
                          <path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156Z"></path>
                        </svg>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inquiries"
                        className="flex items-center gap-3 text-sm font-medium hover:text-orange-500 transition"
                      >
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 22 22"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374Z"></path>
                        </svg>
                        My Inquiries
                      </Link>
                    </li>
                  </ul>

                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:text-orange-500 transition text-left"
                  >
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 22 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531Z"></path>
                      <path d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844Z"></path>
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CustomerHeader;
