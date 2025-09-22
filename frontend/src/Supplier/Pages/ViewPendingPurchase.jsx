import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierTable from "./Components/SupplierTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import PendingPurchaseTable from "./Components/PendingPurchaseTable";
import Header from "../../Shared/Components/UiElements/header";

const ViewPendingPurchase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredPurchase, setFilteredPurchase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchase, setpurchase] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/supplierproduct/purchase/list`)
      .then((res) => {
        setpurchase(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        
      });
  }, []);

  useEffect(() => {
    setFilteredPurchase(purchase);
  }, [purchase]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = purchase.filter(purchase =>
      purchase.ID.toLowerCase().includes(e.target.value.toLowerCase())||
      purchase.date.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPurchase(filtered);
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />
        
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Pending Purchases</h1>
                <div className="mr-96">
                    <Search
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    placeholder={"Search By ID / Date"}
                    />
                </div>
              </div>
              <PendingPurchaseTable
                Purchase={FilteredPurchase}
                loading={loading}
                setloading={setLoading}
              />
            </Card>
          
      </div>
    </>
  );
};

export default ViewPendingPurchase;
