import React from "react";

const PrintDetails = ({ details, componentRef, totalAmount, paid}) => {

  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()
  return (
    <>
      <div className="container fixed mx-10 my-8 -z-50" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">
        Purchase details : 
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
                      className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                        index === 0 ? "border-t-2 border-black" : "border-t"
                      }`}
                    >
                      {item.productName}
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
                      Rs. {item.price* item.quantity}
                    </td>
                  </tr>
                );
              })}
              <tr
                className={`${0 % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"} text-center`}
              >
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                  colSpan={4}
                >
                  Total Amount
                </td>
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  Rs. {totalAmount}
                </td>
              </tr>
              <tr
                className={`${0 % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"} text-center`}
              >
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                  colSpan={4}
                >
                Amount Paid
                </td>
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  Rs. {paid}
                </td>
              </tr>
              <tr
                className={`${0 % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"} text-center`}
              >
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                  colSpan={4}
                >
                Credit amount
                </td>
                <td
                  className={`py-1 px-2 sm:px-3 font-normal text-base ${
                    1 === 0 ? "border-t-2 border-black" : "border-t"
                  }`}
                >
                  Rs. {totalAmount-paid}
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-left ">
            <p>Date of Approval: {currentDate} {currentTime}</p>
          </div>
          <div>
            <p>Signature of Authorized Person</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintDetails;
