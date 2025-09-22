import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { useReactToPrint } from "react-to-print";

const InquiryReport = () => {
    const [inquiry, setInquiry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteInquiry, setDeleteInquiry] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredinquiry, setFilteredinquiry] = useState([]);
    const [statusFilter, setStatusFilter] = useState({ value: "all", label: "All" });
    const currentDate = new Date().toLocaleDateString();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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

const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Inquiry report",
    onAfterPrint: () => alert("Inquiry Report is successfully genrated !"),
  });

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  startDateObj.setHours(0, 0, 0, 0);
  endDateObj.setHours(0, 0, 0, 0);

  return (
    <div className="container mx-auto my-8 mt-10">
      <div className="flex items-center justify-between mb-4">
      
        <div className="mr-4">
                  <label htmlFor="startDate" className="mr-2">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label htmlFor="endDate" className="ml-4 mr-2">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleprint}
          className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Generate Report
        </button>
      </div>
      <div className="container mx-auto my-8" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">Inquiry Report</h1>
        <p className="mb-4">
          <strong>Business Name:</strong> Kandurata Glass and Locks
          <br />
          <strong>Address:</strong> kandy street matale
          <br />
          <strong>Date:</strong> {currentDate}
        </p>
        <div className="mt-4">
          {loading ? (
            <div className="mt-8">
              <Loader />
            </div>
          ) : (
            <React.Fragment>
              <Table
                Headings={[
                  "#",
                  "Inquiry ID",
                  "Customer Name",
                  "Status",
                  "Rating",
                ]}
                style={{ width: "100%" }}
              >
                {inquiry.map((item, index) => {
  const createdAtDate = new Date(item.createdAt);
  if (createdAtDate >= startDateObj && createdAtDate <= endDateObj) {
    return (
      <TableRow key={index}>
        <td className="text-center">{index + 1}</td>
        <td className="text-center">{item.ID}</td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">{item.status}</td>
        <td className="text-center">{item.rating}</td>
      </TableRow>
    );
  } else {
    return null; // Exclude data outside the specified date range
  }
})}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg ">
                  
                </h1>
               </div>
            </React.Fragment>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-left ">
            <p>Date of Approval: {currentDate}</p>
          </div>
          <div>
            <p><br></br>Signature of Authorized Person</p>
            
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryReport;
