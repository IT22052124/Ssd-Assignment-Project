import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Loader from '../../../Shared/Components/UiElements/Loader';
import Table from '../../../Shared/Components/UiElements/Table';
import axios from 'axios';
import TableRow from '../../../Shared/Components/UiElements/TableRow';

const SupplierReportDetails = () => {
  const [loading, setLoading] = useState(false);
  const [purchase, setPurchase] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/supplierproduct/report/new`)
      .then((response) => {
        setPurchase(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchase:", error);
        setLoading(false);
      });
  }, []);

  const currentDate = new Date().toLocaleDateString();
  const componentRef = useRef();

  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Supplier report",
    onAfterPrint: () => alert("Supplier Report is successfully generated !"),
  });

  const filteredPurchases = purchase.filter((item) => {
    const purchaseDate = new Date(item.Date);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    startDateObj.setHours(0, 0, 0, 0);
    endDateObj.setHours(0, 0, 0, 0);
    purchaseDate.setHours(0, 0, 0, 0);
  
    return purchaseDate >= startDateObj && purchaseDate <= endDateObj;
  });

  const aggregateData = () => {
    const aggregate = {};
    filteredPurchases.forEach((item) => {
      const { SupplierID, Total } = item;
      if (!aggregate[SupplierID]) {
        aggregate[SupplierID] = {
          SupplierID,
          SupplierName: item.SupplierName,
          frequency: 0,
          totalAmount: 0,
        };
      }
      aggregate[SupplierID].frequency++;
      aggregate[SupplierID].totalAmount += Total;
    });
    return Object.values(aggregate);
  };

  const aggregatedData = aggregateData();
  const totalPurchaseAmount = aggregatedData.reduce((total, item) => total + item.totalAmount, 0);
  const totalFrequency = aggregatedData.reduce((total, item) => total + item.frequency, 0);

  const topSupplier = aggregatedData.reduce((top, item) => {
    return item.totalAmount > top.totalAmount ? item : top;
  }, { SupplierName: 'None', totalAmount: 0 });

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
        <h1 className="text-3xl font-bold mb-2">Supplier Report : {startDate} - {endDate}</h1>
        <p className="mb-4">
          <strong>Business Name:</strong> Kandurata Glass and Locks
          <br />
          <strong>Address:</strong> Kandy street matale
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
                  "Supplier ID",
                  "Supplier Name",
                  "Frequency",
                  "Total Amount",
                ]}
                style={{ width: "100%" }}
              >
                {aggregatedData.map((item, index) => (
                  <TableRow key={index}>
                    <td className="text-center">{item.SupplierID}</td>
                    <td className="text-center">{item.SupplierName}</td>
                    <td className="text-center">{item.frequency}</td>
                    <td className="text-center">{item.totalAmount}</td>
                  </TableRow>
                ))}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg">
                  <b>Summary Information:</b>
                </h1>
                <p><b>Total Purchase Amount :</b> Rs.{totalPurchaseAmount}.00</p>
                <p><b>Total frequency of purchase :</b> {totalFrequency}</p>
                <p><b>Top supplier :</b> {topSupplier.SupplierName} with Rs.{topSupplier.totalAmount}.00</p>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-left">
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

export default SupplierReportDetails;
