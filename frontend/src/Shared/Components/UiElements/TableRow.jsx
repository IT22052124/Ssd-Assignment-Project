import React from "react";

const TableRow = (props) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
      {props.children}
    </tr>
  );
};

export default TableRow;
