import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmBox from "./DeleteConfirmBox";
import ViewPopup from "../../../Product/Pages/Components/Viewpopup";

const ThreeDotDropdown = (props) => {
  const [isClick, setIsClick] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModel = () => {
    setIsClick(!isClick);
  };

  const toggleView = () => {
    setViewOpen(!viewOpen);
  };
  let style;
  if(props.length >= props.index && props.length - 1 <= props.index && props.length >=4){
    style = "bottom-full"
  }
  else
    style = ""

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleModel}
        id="dropdownMenuIconHorizontalButton"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isClick && (
        <div
          id="dropdownDotsHorizontal"
          className={`z-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 block absolute  items-center ${style}`}
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
          >
            <li >
              <Link
                onClick={toggleView}
                to={props.link1}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                View
              </Link>
              {props.popup && (
              <ViewPopup id={props.id} click={viewOpen} setClick={setViewOpen}/>)}
            </li>
            <li>
              <Link
                to={props.link2}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Update
              </Link>
            </li>
            <li>
              <DeleteConfirmBox deleteLink={props.deleteLink} dlt={props.dlt} dltset={props.dltset}/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDotDropdown;
