import React from "react";

const PrintQuotation = ({
  details,
  componentRef,
  totalAmount,
  totalItems,
  checkbox,
  paidAmount,
  balance,
}) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  return (
    <>
      <div className="container fixed mx-10 my-8 -z-10" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">
          {checkbox ? "Quotation" : "Payment Successful"}
          {}
        </h1>
        <p className="mb-4">
          <strong>Business Name:</strong> Kandurata Glass and Locks
          <br />
          <strong>Address:</strong> kandy street matale
          <br />
          <strong>Date:</strong> {currentDate}
        </p>
        <div className="mt-4 w-full min-h-44 overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none ">
          <table
            id="example"
            className="table-auto bg-[#222E3A]/[6%] overflow-scroll md:overflow-auto w-full text-left font-inter border "
          >
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  #
                </th>
                <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Pro. Id
                </th>
                <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Product Name
                </th>
                <th className="py-2 px-2 text-center sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Quantity
                </th>
                <th className="py-2 px-2 sm:px-3 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Price
                </th>
                <th className="py-2 px-2 sm:px-3 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {details?.map((item, index) => {
                return (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    }`}
                    key={index}
                  >
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {item.ID}
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {item.name}
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {item.quantity}
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      Rs. {item.price}
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {item.total}
                    </td>
                  </tr>
                );
              })}
              <tr
                className={`${
                  0 % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                } text-center`}
              >
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                  colSpan={5}
                >
                  Total Amount
                </td>
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  {totalAmount}
                </td>
              </tr>
              {!checkbox && (
                <>
                  <tr
                    className={`${
                      0 % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    } text-center`}
                  >
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base ${
                        1 === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                      colSpan={5}
                    >
                      Payed Amount
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base ${
                        1 === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {paidAmount}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      0 % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    } text-center`}
                  >
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base ${
                        1 === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                      colSpan={5}
                    >
                      Balance
                    </td>
                    <td
                      className={`py-1 px-2 sm:px-3 font-normal text-base ${
                        1 === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {balance}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          
          <p>
            <b>Total Items : </b>
            {totalItems}
          </p>
          <p>
            <b>Total Amount :</b> {totalAmount}
          </p>
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-left ">
            <p>
              Date of Approval: {currentDate} {currentTime}
            </p>
          </div>
          <div>
            <p>Signature of Authorized Person</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintQuotation;
