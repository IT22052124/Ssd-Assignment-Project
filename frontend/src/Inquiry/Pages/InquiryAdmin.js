import React, { useEffect, useState } from "react";
import axios from "axios";
import InquiryTable from "./Components/TableAdmin";
import Card from "../../Shared/Components/UiElements/Card";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Header from "../../Shared/Components/UiElements/header";
import Search from "../../Shared/Components/UiElements/Search";
import Select from "react-tailwindcss-select";

const Inquiry = () => {
  const [inquiry, setInquiry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteInquiry, setDeleteInquiry] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredinquiry, setFilteredinquiry] = useState([]);
  const [statusFilter, setStatusFilter] = useState({ value: "all", label: "All" });

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
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />
        <Card className="flex" style={{ width: "100%", overflow: "hidden" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Inquiry List</h1>
            <Search searchTerm={searchTerm} handleSearch={handleSearch} placeholder={"Search By subject / Name"} />
            <div style={{ width: "150px", marginRight: "80px" }}>
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
          </div>
          <InquiryTable
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
