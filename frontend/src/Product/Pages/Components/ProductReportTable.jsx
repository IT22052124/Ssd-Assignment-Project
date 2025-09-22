import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loader3 from "../../../Shared/Components/UiElements/loader3";

const ProductReportTable = ({ date, componentRef }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  const getStarsFromRating = (avgRating) => {
    const maxStars = 5;

    const filledStars = Math.floor(avgRating);
    const halfStar = avgRating - filledStars >= 0.5;
    const emptyStars = maxStars - filledStars - (halfStar ? 0.5 : 0);

    return { filledStars, halfStar, emptyStars };
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product/Report/", {
        params: {
          startDate:
            date.startDate || moment().startOf("month").format("YYYY-MM-DD"),
          endDate: date.endDate || moment().endOf("month").format("YYYY-MM-DD"),
        },
      })
      .then((res) => {
        setDetails(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, [date]);

  const totalUnitsSold = details.reduce(
    (total, product) => total + product.totalUnits,
    0
  );
  const totalOnlineUnits = details.reduce(
    (total, product) => total + product.totalOrderUnits,
    0
  );
  const totalOfflineUnits = details.reduce(
    (total, product) => total + product.totalInvoiceUnits,
    0
  );
  const totalReviewsReceived = details.reduce(
    (total, product) => total + product.totalReviews,
    0
  );
  const sortedProducts = [...details].sort(
    (a, b) => b.totalUnits - a.totalUnits
  );
  const topProducts = sortedProducts.filter(
    (product) => product.totalUnits === sortedProducts[0].totalUnits
  );

  return (
    <div className="container mx-auto my-8" >
    <div className="m-3" ref={componentRef}>
      <h1 className="text-3xl font-bold mb-2">
        Product Report : {date.startDate}
        {" - "}
        {date.endDate}
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
                Pro. Id
              </th>
              <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Product Name
              </th>
              <th className="py-2 px-2 text-center sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Category
              </th>
              <th className="py-2 px-2 sm:px-3 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Online/Offline
              </th>
              <th className="py-2 px-2 sm:px-3 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Unit Sold
              </th>
              <th className="py-2 px-2 sm:px-3 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Total Reviews
              </th>
              <th className="py-2 px-2 sm:px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                Avg Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <tr>
                  <th colSpan={7}>
                    <center>
                      <Loader3 />
                    </center>
                  </th>
                </tr>
              </>
            ) : (
              <>
                {details?.map((data, index) => {
                  const { filledStars, halfStar, emptyStars } =
                    getStarsFromRating(data.averageRating);
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
                        {data?.ID}
                      </td>
                      <td
                        className={`py-1 px-2 sm:px-3 font-normal text-base ${
                          index === 0 ? "border-t-2 border-black" : "border-t"
                        }`}
                      >
                        {data?.name}
                      </td>
                      <td
                        className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                          index === 0 ? "border-t-2 border-black" : "border-t"
                        }`}
                      >
                        {data?.category}
                      </td>
                      <td
                        className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                          index === 0 ? "border-t-2 border-black" : "border-t"
                        }`}
                      >
                        {data?.totalOrderUnits} / {data?.totalInvoiceUnits}
                      </td>
                      <td
                        className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                          index === 0 ? "border-t-2 border-black" : "border-t"
                        }`}
                      >
                        {data?.totalUnits}
                      </td>
                      <td
                        className={`py-1 px-2 sm:px-3 font-normal text-base text-center ${
                          index === 0 ? "border-t-2 border-black" : "border-t"
                        }`}
                      >
                        {data?.totalReviews}
                      </td>
                      <td
                        className={`py-1 px-2 sm:px-3 font-normal text-base ${
                          index === 0 ? "border-t-2 border-black" : "border-t"
                        }`}
                      >
                        <div class="flex items-center gap-0.5">
                          {Array.from({ length: filledStars }, (_, index) => (
                            <svg
                              key={`filled-${index}`}
                              className="h-4 w-4 text-orange-600"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                          ))}
                          {halfStar && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-orange-600"
                              fill="currentColor"
                              width="16"
                              height="16"
                              version="1.1"
                              id="Capa_1"
                              viewBox="0 0 276.901 276.901"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0" />

                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />

                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M275.922,105.676c-2.353-7.24-8.612-12.517-16.146-13.611l-71.441-10.381l-31.95-64.737 c-3.369-6.826-10.322-11.148-17.935-11.148c-7.613,0-14.565,4.322-17.935,11.148L88.566,81.684L17.125,92.065 c-7.533,1.095-13.793,6.371-16.146,13.611s-0.391,15.188,5.062,20.502l51.695,50.391l-12.203,71.153 c-1.287,7.504,1.798,15.087,7.956,19.562c6.159,4.475,14.326,5.065,21.063,1.521l63.898-33.594l63.899,33.594 c2.927,1.539,6.121,2.298,9.305,2.298c4.146,0,8.273-1.288,11.758-3.819c6.159-4.475,9.243-12.059,7.956-19.562l-12.204-71.153 l51.696-50.39C276.312,120.864,278.274,112.916,275.922,105.676z M183.715,155.264c-4.714,4.595-6.865,11.215-5.752,17.703 l7.131,41.575l-37.337-19.629c-2.913-1.532-6.11-2.298-9.306-2.298V70.99l18.669,37.826c2.913,5.902,8.545,9.994,15.059,10.94 l41.743,6.065L183.715,155.264z" />{" "}
                              </g>
                            </svg>
                          )}
                          {Array.from({ length: emptyStars }, (_, index) => (
                            <svg
                              key={`empty-${index}`}
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4 text-orange-600"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#e0e0e0"
                              viewBox="0 0 24 24"
                            >
                              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h1 className="text-lg ">
          <b>Summary Information:</b>
        </h1>

        <p>
          <b>Total Items : </b>
          {details?.length}
        </p>
        <p>
          <b>Total Unit Sold :</b> {totalUnitsSold}
        </p>
        <p>
          <b>Total Online unit Sold :</b> {totalOnlineUnits}
        </p>
        <p>
          <b>Total Offline unit Sold :</b> {totalOfflineUnits}
        </p>
        <p>
          <b>Top Product :</b>{" "}
          {topProducts.map((product, index) => (
            <span key={index}>
              {product.name}
              {" ( "}
              {product.totalUnits}
              {" ) "}
              {index !== topProducts.length - 1 && ", "}
            </span>
          ))}
        </p>
        <p>
          <b>Total Reviews Received :</b> {totalReviewsReceived}
        </p>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="text-left ">
          <p>Date of Approval: {currentDate}</p>
        </div>
        <div>
          <p>Signature of Authorized Person</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductReportTable;
