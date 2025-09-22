import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import ProfitTable from "./Components/ProfitTable";
import Header from "../../Shared/Components/UiElements/header";

const ViewProfit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilteredProfit, setSearchFilteredProfit] = useState([]);
  const [dateFilteredProfit, setDateFilteredProfit] = useState([]);
  const [finalFilteredProfit, setFinalFilteredProfit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profit, setProfit] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderAsc, setOrderAsc] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/profit/profit/`)
      .then((res) => {
        setProfit(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(profit)
  useEffect(() => {
    setSearchFilteredProfit(profit);
    setDateFilteredProfit(profit);
    applyFilters(searchTerm, profit, startDate, endDate);
  }, [profit]);

  useEffect(() => {
    applyFilters(searchTerm, profit, startDate, endDate);
  }, [searchTerm, startDate, endDate]);

  const applyFilters = (searchTerm, profit, startDate, endDate) => {
    let filtered = profit;
    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date).toISOString().slice(0, 10);
        return (
          item.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemDate.includes(searchTerm.toLowerCase())
        );
      });
    }
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date).toISOString().slice(0, 10);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
   
    if (orderAsc) {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFinalFilteredProfit(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, profit, startDate, endDate);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    applyFilters(searchTerm, profit, date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    applyFilters(searchTerm, profit, startDate, date);
  };

  const toggleOrder = () => {
    setOrderAsc((prevOrderAsc) => !prevOrderAsc);
    applyFilters(searchTerm, profit, startDate, endDate);
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Profit</h1>
            <div>
              <Search
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                placeholder={"Search By ProductID / OrderID / Date"}
              />
            </div>
            <div className="flex flex-col ...">
              <div className="flex flex-row">
                <div className="pr-6">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                  />
                </div>
                <div>
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                  />
                </div>
              </div>
            <div className="pt-3">
              <input
                type="checkbox"
                checked={orderAsc}
                onChange={toggleOrder}
              />
              <label>Sort by Date (Newest First)</label>
            </div>
            </div>
          </div>
          <ProfitTable
            Profit={finalFilteredProfit}
            loading={loading}
            setloading={setLoading}
          />
        </Card>
      </div>
    </>
  );
};

export default ViewProfit;
