import React, { useEffect, useState } from "react";
import axios from "axios";
import FaqTable from "./Components/TableCustomer";
import Card from "./Components/Card";
import Navbar from "../../Shared/Components/UiElements/CustomerHeader";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Search from "../../Shared/Components/UiElements/Search";
import CustomerHeader from "../../Shared/Components/UiElements/CustomerHeader";
import Select from "react-tailwindcss-select";


const Inquiry = () => {
  const [inquiry, setInquiry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteInquiry, setDeleteInquiry] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredinquiry, setFilteredinquiry] = useState([]);
  const [statusFilter, setStatusFilter] = useState({ value: "all", label: "All" });
  
  useEffect(() => {}, [inquiry]);


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/inquiry")
      .then((res) => {
        setInquiry(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [deleteInquiry]);

  useEffect(() => {
    let filtered = inquiry;
    if (statusFilter.value !== "all") {
      filtered = inquiry.filter((item) => item.status.toLowerCase() === statusFilter.value);
    }
    setFilteredinquiry(filtered);
  }, [inquiry, statusFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = inquiry.filter((inquiry) =>
      inquiry.subject.toLowerCase().includes(e.target.value.toLowerCase()) ||
      inquiry.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredinquiry(filtered);
  };
  return (
    <>
      <CustomerHeader/>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900 mr-40">
          <Card className="flex" style={{ width: "100%" } }>
          <div className="flex justify-between items-center ">
            <h1 className="text-3xl my-8 ml4" style={{ color: 'red' }}>My Inquiries</h1>
            <div style={{ width: "250px", marginRight: "80px" }}>
              <Select
              isSearchable
              value={statusFilter}
              primaryColor={"red"}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: "all", label: "All" },
                { value: "solved", label: "Solved" },
                { value: "pending", label: "Pending" },
                { value: "on progress", label: "On progress" },
              ]}
            />
            </div>
            <Link to="/inquiry/create">
              <MdOutlineAddBox className="text-sky-800 text-4xl mr-4" />
            </Link>
          </div>
          <FaqTable
            inquiry={filteredinquiry}
            loading={loading}
            setloading={setLoading}
            dltset={setDeleteInquiry}
            dlt={deleteInquiry}
          />
        </Card>
      </div>
    </>
  );
};

export default Inquiry;
