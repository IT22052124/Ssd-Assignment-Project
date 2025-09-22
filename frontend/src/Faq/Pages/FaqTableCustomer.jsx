import React, { useEffect, useState } from "react";
import axios from "axios";
import FaqTable from "./Components/FaqTableCustomer";
import Card from "./Components/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import CustomerHeader from "../../Shared/Components/UiElements/CustomerHeader";

const Faq = () => {
  const [faq, setfaq] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteFaq, setDeleteFaq] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredfaq, setFilteredfaq] = useState([]);

  useEffect(() => {
    setFilteredfaq(faq);
  }, [faq]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = faq.filter(faq =>
      faq.issue.toLowerCase().includes(e.target.value.toLowerCase())||
      faq.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredfaq(filtered);
};


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/faq")
      .then((res) => {
        setfaq(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteFaq]);
  return (
    <>
      <CustomerHeader title="Frequently Asked Questions"/>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900 mr-40">
        
        <Card className="flex " style={{ width: "100%" } }>
          <div className="flex justify-between items-center ">
            <h1 className="text-3xl my-8 ml-8" style={{ color: 'red' }}>How can we help you?</h1>
            
            <div className="mr-8">
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              placeholder={"Descrie your issue"}
             />
            </div>
           
          </div>
          <FaqTable
            faq={filteredfaq}
            loading={loading}
            setloading={setLoading}
            dltset={setDeleteFaq}
            dlt = {deleteFaq}
          />
        </Card>
      </div>
    </>
  );
};

export default Faq;
