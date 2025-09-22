import React, { useEffect, useState } from "react";
import Notifications from "./Header/notifications";
import axios from "axios";

const Header = () => {
  const [clickNotification, setClickNotification] = useState(false);
  const [notify, setNotify] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newNotifyCount, setNewNotifyCount] = useState();

  const toggleNotification = () => {
    setClickNotification(!clickNotification);
    axios
      .put("http://localhost:5000/notify/mark-as-seen")
      .then((res) => {
        setNewNotifyCount(0)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
    
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/notify/")
      .then((res) => {
        setNotify(res.data);
        setNewNotifyCount(res.data.filter(
          (notification) => notification.seen === "Pending"
        ).length);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, [newNotifyCount]);

  return (
    <>
      <nav
        className="fixed ml-64 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        style={{ backgroundColor: "white" , width: "84%" }}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start"></div>
            <div className="flex items-center">
              <div className="hidden mr-3 -mb-1 sm:block">
                <span></span>
              </div>
              <button
                type="button"
                onClick={toggleNotification}
                className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 z-10"
              >
                <span className="sr-only">View notifications</span>

                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                {newNotifyCount > 0 && newNotifyCount < 10 &&(
                  <span className="absolute inset-0 object-right-top top-0 p-5">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 pl- border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    {newNotifyCount}
                    </div>
                  </span>
                )}
                {newNotifyCount > 10 &&(
                  <span className="absolute inset-0 object-right-top top-0 p-5">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 pl- border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    9⁺
                    </div>
                  </span>
                )}
              </button>

              {clickNotification && <Notifications notify={notify} />}

              <button
                id="theme-toggle"
                data-tooltip-target="tooltip-toggle"
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
              >
                <svg
                  id="theme-toggle-dark-icon"
                  className="hidden w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg
                  id="theme-toggle-light-icon"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id="tooltip-toggle"
                role="tooltip"
                className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip opacity-0 invisible"
                style={{
                  position: "absolute",
                  inset: "0px auto auto 0px",
                  margin: "0px",
                  transform: "translate3d(1348.8px, 64.8px, 0px)",
                }}
                data-popper-placement="bottom"
              >
                Toggle dark mode
                <div
                  className="tooltip-arrow"
                  data-popper-arrow=""
                  style={{
                    position: "absolute",
                    left: "0px",
                    transform: "translate3d(68.8px, 0px, 0px)",
                  }}
                ></div>
              </div>

              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button-2"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-2"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>

                <div
                  className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 hidden"
                  id="dropdown-2"
                  style={{
                    position: "absolute",
                    inset: "0px auto auto 0px",
                    margin: "0px",
                    transform: "translate3d(1348.8px, 64.8px, 0px)",
                  }}
                  data-popper-placement="bottom"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
