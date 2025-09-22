import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerTable from "./Components/CustomerTable";
import Card from "../Shared/Components/UiElements/Card";
import Navbar from "../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../Shared/Components/UiElements/Search";
import Pagination from "../Shared/Components/FormElements/Pagination";

const Customers = () => {
  const [customers, setcustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState(1);
  const [displayCustomer, setDisplayCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredcustomers, setFilteredCustomers] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = customers.filter(customers =>
      customers.name.toLowerCase().includes(e.target.value.toLowerCase())||
      customers.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setActivePage(1);
  };

  useEffect(() => {
    setFilteredCustomers(customers);
    setDisplayCustomer(customers)
  }, [customers]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };
  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayCustomer(filteredcustomers.slice(startIndex, endIndex));
  }, [activePage, filteredcustomers]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/customer")
      .then((res) => {
        setcustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteCustomer]);
  return (
    <>
      <div>
        <Navbar />
        
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
              <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
                <Link to="/Customer/TopCustomers">
                <button
                  className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  Top Customers
                </button>
                </Link>
                <h1 className="text-3xl my-8">Customer List</h1>
                <Link to="/Customer/create">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <CustomerTable

                Customers={displayCustomer}
                loading={loading}
                setloading={setLoading}
                dlt={deleteCustomer} 
                dltset={setDeleteCustomer}
              />

              <Pagination
                  active={activePage}
                  totalItems={filteredcustomers.length}
                  itemsPerPage={6}
                  onPageChange={handlePageChange}
               />
            </Card>
          
      </div>
    </>
  );
};

export default Customers;
