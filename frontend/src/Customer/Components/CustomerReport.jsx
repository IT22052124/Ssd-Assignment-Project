import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Loader from "../../Shared/Components/UiElements/Loader";
import Table from "../../Shared/Components/UiElements/Table";
import TableRow from "../../Shared/Components/UiElements/TableRow";

const CustomerReport = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [topCustomer, setTopCustomer] = useState('');
  const [topCustomeramount, setTopCustomeramount] = useState(0);
  const [numCustomers, setNumCustomers] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0); 
  const [minAmount, setMinAmount] = useState(0); 

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/customer/Top/Customers")
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const totalExpense = customers.reduce((acc, curr) => acc + curr.totalAmount, 0);
    setTotalPurchases(totalExpense);
    
    setNumCustomers(customers.length);
    
    if (customers.length > 0) {
      const creditArr = customers.map((customer) => customer.totalAmount);
      setMaxAmount(Math.max(...creditArr));
      setMinAmount(Math.min(...creditArr));

      // Find the top customer based on the highest totalAmount
      const topCustomer = customers.reduce((max, customer) => 
        customer.totalAmount > max.totalAmount ? customer : max, customers[0] || {}
      );
      setTopCustomer(topCustomer.customer.name);
      setTopCustomeramount(topCustomer.totalAmount);
    }
  }, [customers]); 

  console.log(topCustomer)

  const currentDate = new Date().toLocaleDateString();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Customer report",
    onAfterPrint: () => alert("Customer Report is successfully generated!"),
  });

  return (
    <div className="container mx-auto my-8 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="mr-4">
        
        </div>
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Generate Report
        </button>
      </div>
      <div className="container mx-auto my-8" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">Customer Report</h1>
        <p className="mb-4">
          <strong>Business Name:</strong> Kandurata Glass and Locks
          <br />
          <strong>Address:</strong> Kandy Street Matale
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
                  "Customer ID",
                  "Customer Name",
                  "Telephone",
                  "Total Amount",
                ]}
                style={{ width: "100%" }}
              >
                {customers.map((customer, index) => (
                  <TableRow key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{customer.customer.ID}</td>
                    <td className="text-center">{customer.customer.name}</td>
                    <td className="text-center">{customer.customer.telephone}</td>
                    <td className="text-center">{customer.totalAmount}</td>
                  </TableRow>
                ))}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg ">
                  <b>Summary Information:</b>
                </h1>
                <p>
                  <b>Total purchases for the Month:</b> Rs.{totalPurchases}.00
                </p>
                <p>
                  <b>Top customer:</b> {topCustomer|| "-"} is with Rs.{topCustomeramount || 0}.00
                </p>
                <p>
                  <b>Number of customers: </b>
                  {numCustomers}
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="mt-8 flex justify-between">
            <div className="text-left ">
              <p>Date of Approval: {currentDate}</p>
            </div>
            <div>
              <p>Signature of Authorized Person</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CustomerReport;

