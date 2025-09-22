import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderTable from "./Components/OrderTable";
import Card from "../Shared/Components/UiElements/Card";
import Navbar from "../Shared/Components/UiElements/Navbar";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "../Shared/Components/UiElements/Search";
import Pagination from "../Shared/Components/FormElements/Pagination";
import Header from "../Shared/Components/UiElements/header";

const Order = () => {
  const [Orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/order")
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    setFilteredOrders(Orders);
    setDisplayOrders(Orders)
  }, [Orders]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayOrders(FilteredOrders.slice(startIndex, endIndex));
  }, [activePage, FilteredOrders]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = Orders.filter((order) => {
      const lowercaseDate = order.date ? order.date.toLowerCase() : '';
      const lowercaseID = order.ID ? order.ID.toLowerCase() : '';
      const lowercaseemail = order.userId.mail ? order.userId.mail.toLowerCase() : '';
      return (
        lowercaseDate.includes(e.target.value.toLowerCase()) ||
        lowercaseID.includes(e.target.value.toLowerCase())||
        lowercaseemail.includes(e.target.value.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
    setActivePage(1);
  };
  

  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar select={"Order Details"}/>
        <Header/>
      
        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl my-8">Order List</h1>
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholder={"Search By ID / Date / Email"}
            />
            
              <MdOutlineAddBox className="text-sky-800 text-4xl" />
            
          </div>
          <OrderTable
            Order={displayOrders}
            loading={loading}
            setLoading={setLoading}
            active={activePage}
            itemsPerPage={6}
          />
          <Pagination
            active={activePage}
            totalItems={FilteredOrders.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
        </Card>
      </div>
    </>
  );
};

export default Order;
