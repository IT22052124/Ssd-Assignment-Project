import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import RSProductTable from "./Components/RSProductTable";
import Header from "../../Shared/Components/UiElements/header";

const RestockProduct = () => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product/RestockProduct/")
      .then((res) => {
        setProducts(res.data);
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
    setFilteredProducts(products);
    setDisplayProducts(products)
  }, [products]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayProducts(FilteredProducts.slice(startIndex, endIndex));
  }, [activePage, FilteredProducts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setActivePage(1)
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar select={"Restock Products"}/>
        <Header/>
        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl my-8">Restock Product List</h1>
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholder={"Search By ID / Name"}
            />
          </div>
          <RSProductTable
            Product={displayProducts}
            loading={loading}
            setLoading={setLoading}
            active={activePage}
            itemsPerPage={6}
          />
          <Pagination
            active={activePage}
            totalItems={FilteredProducts.length}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
        </Card>
      </div>
    </>
  );
};

export default RestockProduct; 
