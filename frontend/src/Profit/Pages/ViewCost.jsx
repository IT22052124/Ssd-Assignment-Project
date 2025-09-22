import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import CostTable from "./Components/CostTable";
import Header from "../../Shared/Components/UiElements/header";

const ViewCost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCost, setFilteredCost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false); // State for checkbox

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/profit/cost/`)
      .then((res) => {
        setCost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCost(cost);
  }, [cost]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = cost.filter(
      (item) =>
        item.productID.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.date.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCost(filtered);
  };

  const handleCheckboxChange = (e) => {
    setShowInStockOnly(e.target.checked);
    if (e.target.checked) {
      const filtered = cost.filter((item) => item.inStock !== 0);
      setFilteredCost(filtered);
    } else {
      setFilteredCost(cost);
    }
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Cost History</h1>
            <div>
              <Search
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                placeholder={"Search By Product / Date"}
              />
            </div>
            <div className="mr-4">
              <label htmlFor="instockCheckbox" className="inline-flex items-center">
                Show In Stock Only:
                <input
                  id="instockCheckbox"
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={handleCheckboxChange}
                  className="ml-2"
                />
              </label>
            </div>
          </div>
          <CostTable Cost={filteredCost} loading={loading} setloading={setLoading} />
        </Card>
      </div>
    </>
  );
};

export default ViewCost;
