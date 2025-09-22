import React, { useEffect, useState } from "react";
import axios from "axios";
import WholesalecustomerTable from "./Components/WholesalecustomerTable";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import Header from "../../Shared/Components/UiElements/header";


const Wholesalecustomer = () => {
  const [wholesalecustomer, setwholesalecustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWholesalecustomers, setFilteredWholesalecustomers] = useState([]);

  useEffect(() => {
    setFilteredWholesalecustomers(wholesalecustomer);
  }, [wholesalecustomer]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = wholesalecustomer.filter(wholesalecustomer =>
      wholesalecustomer.name.toLowerCase().includes(e.target.value.toLowerCase())||
      wholesalecustomer.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredWholesalecustomers(filtered);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/wholesalecustomer")
      .then((res) => {
        setwholesalecustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteCustomer]);
  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header/>
        
            <Card className="flex" style={{ width: "100%" }}>
              <div className="flex justify-between items-center">
              <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
                <h1 className="text-3xl my-8">Wholesalecustomer List</h1>
                <Link to="/Wholesalecustomer/create">
                  <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
              </div>
              <WholesalecustomerTable
                Wholesalecustomer={filteredWholesalecustomers}
                loading={loading}
                setloading={setLoading}
                dltset={setDeleteCustomer}
                dlt={deleteCustomer}
              />
            </Card>
          
      </div>
    </>
  );
};

export default Wholesalecustomer;
