import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierTable from "./Components/SupplierTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";

const Suppliers = () => {
  const [suppliers, setsupplier] = useState([]);
  const [displaySuppliers, setDisplaySuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteSupplier, setdeleteSupplier] = useState(false);
  const [FilteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/supplier")
      .then((res) => {
        setsupplier(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteSupplier]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    setFilteredSuppliers(suppliers);
    setDisplaySuppliers(suppliers)
  }, [suppliers]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplaySuppliers(FilteredSuppliers.slice(startIndex, endIndex));
  }, [activePage, FilteredSuppliers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(e.target.value.toLowerCase())||
      supplier.ID.toLowerCase().includes(e.target.value.toLowerCase())||
      supplier.address.toLowerCase().includes(e.target.value.toLowerCase())||
      supplier.city.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
    setActivePage(1)
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header/>
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Supplier List</h1>
                <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name / Address"}
                />
                <Link to="/Supplier/create">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <SupplierTable
                Suppliers={displaySuppliers}
                loading={loading}
                setloading={setLoading}
                dlt= {deleteSupplier}
                dltset={setdeleteSupplier}
                active={activePage}
                itemsPerPage={6}
              />
              <Pagination
                active={activePage}
                totalItems={FilteredSuppliers.length}
                itemsPerPage={6}
                onPageChange={handlePageChange}
              />
            </Card>
          
      </div>
    </>
  );
};

export default Suppliers;
