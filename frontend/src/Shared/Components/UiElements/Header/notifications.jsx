import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SupplierDetailsNotification from "../../../../Product/Pages/Components/SupplierDetailsNotification";
import axios from "axios";

dayjs.extend(relativeTime);

const Notifications = ({ notify }) => {
  const [count, setCount] = useState(4);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const calculateTimeSince = (createdAt) => {
    const time = dayjs(createdAt);
    return time.fromNow();
  };

  const togglePopup = (id, NotificationID) => {
    setSelectedNotificationId(id);
    reedNotification(NotificationID);
  };

  const reedNotification = (id) => {
    axios
      .put("http://localhost:5000/notify/mark-as-read", {
        id: id,
      })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const showAll = () => {
    setCount(notify.length);
  };
  return (
    <>
      <div
        className=" z-40 max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700 block"
        id="notification-dropdown"
        style={{
          position: "absolute",
          inset: "4px auto auto -500px",
          margin: "0px",
          transform: "translate3d(1348.8px, 64.8px, 0px)",
        }}
        data-popper-placement="bottom"
      >
        <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div className="overflow-y-auto " style={{ maxHeight: "500px" }}>
          {notify.slice(0, count).map((notification) => {
            return (
              <div>
                <a
                  href="#"
                  onClick={() =>
                    togglePopup(notification.Product._id, notification._id)
                  }
                  className={`flex px-4 py-3 border-b ${
                    notification.read === "Pending" && "bg-gray-100"
                  } dark:hover:bg-gray-600 dark:border-gray-600`}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src={`http://localhost:5000/${
                        notification.Product && notification.Product.image
                      }`}
                      alt="Product image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 dark:border-gray-700">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full pl-3">
                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                      New notification for product :
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {notification.Product &&
                          " " + notification.Product.name}
                      </span>
                      : is below the alerted quantity. Remaining quantity:{" "}
                      {notification.Product && notification.Product.Stock}
                    </div>
                    <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                      {calculateTimeSince(notification.createdAt)}
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        {count !== notify.length && (
          <a
            href="#"
            onClick={showAll}
            className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
          >
            <div className="inline-flex items-center ">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              View all
            </div>
          </a>
        )}
      </div>
      {selectedNotificationId && (
        <SupplierDetailsNotification
          ID={selectedNotificationId}
          onClose={() => setSelectedNotificationId(null)}
        />
      )}
    </>
  );
};

export default Notifications;
