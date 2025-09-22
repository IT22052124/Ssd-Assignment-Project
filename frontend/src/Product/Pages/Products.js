import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "./Components/ProductTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "../../Shared/Components/UiElements/Search";
import Pagination from "../../Shared/Components/FormElements/Pagination";
import Header from "../../Shared/Components/UiElements/header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(1);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }, [deleteProduct]);

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
    <><div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar select={"Product Details"}/>
        <Header/>
      
        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl my-8">Product List</h1>
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholder={"Search By ID / Name"}
            />
            <Link to="/Product/new">
              <MdOutlineAddBox className="text-sky-800 text-4xl" />
            </Link>
          </div>
          <ProductTable
            Product={displayProducts}
            loading={loading}
            setLoading={setLoading}
            dltset={setDeleteProduct}
            dlt={deleteProduct}
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

export default Products;
