import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";
import InvoiceDisplayTable from "./component/InvoiceDisplayTable";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [displayInvoices, setDisplayInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/invoice/")
      .then((res) => {
        setInvoices(res.data);
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
    setFilteredInvoices(invoices);
    setDisplayInvoices(invoices)
  }, [invoices]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayInvoices(FilteredInvoices.slice(startIndex, endIndex));
  }, [activePage, FilteredInvoices]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = invoices.filter(
      (product) =>
        product.invoiceId.toLowerCase().includes(e.target.value.toLowerCase()) 
    );
    setFilteredInvoices(filtered);
    setActivePage(1)
  };

  return (
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar select={"Invoice"}/>
        <Header/>
      
        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl my-8">Invoice List</h1>
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholder={"Search By ID / Name"}
            />
          </div>
          <InvoiceDisplayTable
            Product={displayInvoices}
            loading={loading}
            setLoading={setLoading}
            active={activePage}
            itemsPerPage={6}
          />
          <Pagination
            active={activePage}
            totalItems={FilteredInvoices.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
        </Card>
      </div>
    </>
  );
};

export default InvoiceTable;
