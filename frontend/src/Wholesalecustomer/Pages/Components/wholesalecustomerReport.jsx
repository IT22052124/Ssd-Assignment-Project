import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Loader from "../../../Shared/Components/UiElements/Loader";
import { useReactToPrint } from "react-to-print";

const WholesalecustomerReport = () => {
  const [loading, setLoading] = useState(false);
  const [credit, setcredit] = useState([]);
  const [topCustomer, setTopCustomer] = useState('');
  const [topCustomeramount, setTopCustomeramount] = useState(0);
  const [leastCustomer, setLeastCustomer] = useState('');
  const [leastCustomeramount, setLeastCustomeramount] = useState(0);
  const [month, setMonth] = useState(""); // Initialize month state
  const [totalcredit, setTotalcredit] = useState(0); // Total credit state
  const [numcustomer, setnumcustomer] = useState(0); // Number of customer
  const [maxcredit, setMaxcredit] = useState(0); // Maximum credit state
  const [mincredit, setMincredit] = useState(0); // Minimum credit state

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/wholesalecustomer?`)
      .then((response) => {
        setcredit(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching credit:", error);
        setLoading(false);
      });
  },[]);



  useEffect(() => {
    
    const totalExpense = credit.reduce((acc, curr) => acc + curr.credit, 0);
    setTotalcredit(totalExpense);
    
    setnumcustomer(credit.length);
    
    if (credit.length > 0) {
      const creditArr = credit.map((credit) => credit.credit);
      setMaxcredit(Math.max(...creditArr));
      setMincredit(Math.min(...creditArr));

      const topCustomer = credit.reduce((max, credit) => 
        credit.credit > max.credit ? credit : max, credit[0] || {}
      );
      setTopCustomer(topCustomer.name);
      setTopCustomeramount(topCustomer.credit);

      const leastCustomer = credit.reduce((min, credit) => 
        credit.credit < min.credit ? credit : min, credit[0] || {}
      );
      setLeastCustomer(leastCustomer.name);
      setLeastCustomeramount(leastCustomer.credit);

    }
  }, [credit]); 
  const currentDate = new Date().toLocaleDateString();

  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "wholesalecustomer credit report",
    onAfterPrint: () => alert("wholesalecustomer credit Report is successfully genrated !"),
  });

  return (
    <div className="container mx-auto my-8 mt-10">
      <div className="flex items-center justify-between mb-4">
      
        <div className="mr-4">
        
        </div>
        
        <button
          onClick={handleprint}
          className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Generate Report
        </button>
      </div>
      <div className="container mx-auto my-8" ref={componentRef}>
        <h1 className="text-3xl font-bold mb-2">Wholesalecustomer Credit Report</h1>
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
                  "Customer ID",
                  "Customer Name",
                  "credit limit",
                  "credit",
                ]}
                style={{ width: "100%" }}
              >
                {credit.map((credit, index) => (
                    <TableRow key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{credit.ID}</td>
                      <td className="text-center">{credit.name}</td>
                      <td className="text-center">{credit.creditlimit}</td>
                      <td className="text-center">{credit.credit}</td>
                    </TableRow>
                  ))}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg ">
                  <b>Summary Information:</b>
                </h1>
                
                <p><b>Total credit for the Month:</b> Rs.{totalcredit}.00</p>
                
                <p><b>Maximum Credit:</b> {topCustomer} with Rs.{topCustomeramount}.00</p>
                <p><b>Minimum Credit :</b> {leastCustomer} with Rs.{leastCustomeramount}.00</p>
                <p><b>Number of wholesalecustomer: </b>{numcustomer}</p>
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

export default WholesalecustomerReport;
