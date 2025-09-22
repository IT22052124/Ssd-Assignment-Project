import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Components/UiElements/Navbar";
import Header from "../Shared/Components/UiElements/header";
import Restock from "./components/Restock";
import axios from "axios";
import Loader3 from "../Shared/Components/UiElements/loader3";
import TopPandC from "./components/TopPandC";
import Schart from "./components/MontlySale";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [profit, setProfit] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    const stripTimeFromDate = (date) => {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    };
  
    const getStartAndEndOfMonth = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start, end };
    };
  
    const { start, end } = getStartAndEndOfMonth();
  
    const filteredProfit = profit.filter((item) => {
      const itemDate = stripTimeFromDate(item.date);
      return itemDate >= start && itemDate <= end;
    });
  
    const totalProfit = filteredProfit.reduce((acc, item) => acc + item.profit, 0);
    setTotalProfit(totalProfit);
  }, [profit]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/profit/profit/')
      .then((res) => {
        setProfit(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setTotalProducts(res.data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/attendance")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getCurrentDateFormatted = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDateFormatted();

    const countPresentToday = employees.filter(employee => {
      const attendanceDate = new Date(employee.date);
      const formattedDate = `${String(attendanceDate.getDate()).padStart(2, '0')}-${String(attendanceDate.getMonth() + 1).padStart(2, '0')}-${attendanceDate.getFullYear()}`;
      return formattedDate === currentDate && employee.status === 'Present';
    }).length;

    setPresentCount(countPresentToday);
  }, [employees]);
  const currentDate = getCurrentDateFormatted();

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar select={"Dashboard"} />
        <Header />
        <div className="main-content px-4 ml-64 w-full h-screen overflow-y-auto bg-gray-50 pt-14 dark:bg-gray-900">
          <div className="grid w-full grid-cols-1 gap-4 mt-4 sm:grid-cols-4">
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                {loading ? (
                  <center>
                    <Loader3 />
                  </center>
                ) : (
                  <>
                    <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                      current Date
                    </h3>
                    <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                      {currentDate}
                    </span>
                    
                    {" "}
                  </>
                )}
              </div>
            </div>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                 Employees present today :
                </h3>
                <span class="text-2xl text-center font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                {presentCount}
                </span>
                <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                 
                 
                </p>
              </div>
            </div>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Profit for This Month
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                Rs. {totalProfit.toFixed(2)}
                </span>
                
              </div>
            </div>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div class="w-full">
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Total products
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                  {totalProducts}
                </span>
                
              </div>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-2 pt-5 ">
            <Restock />

            <TopPandC />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1 pt-5">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
              <Schart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
