import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Loader from '../../../Shared/Components/UiElements/Loader';
import Table from '../../../Shared/Components/UiElements/Table';
import axios from 'axios';
import TableRow from '../../../Shared/Components/UiElements/TableRow';

const ProfitReportDetails = () => {
  const [loading, setLoading] = useState(false);
  const [profit, setProfit] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [filteredProfit, setFilteredProfit] = useState([]);
  const [previousMonthProfit, setPreviousMonthProfit] = useState(0);
  const [previousMonthSales, setPreviousMonthSales] = useState(0);
  const [summary, setSummary] = useState({
    totalQuantity: 0,
    totalSales: 0,
    totalProfit: 0,
    mostSoldProduct: '',
    mostSoldProductQuantity: 0,
    mostProfitableProduct: '',
    mostProfitableProductProfit: 0,
    mostSalesProduct: '',
    mostSalesProductAmount: 0,
    totalOnlineSales: 0,
    totalOfflineSales: 0,
    totalOnlineProfit: 0,
    totalOfflineProfit: 0,
    percentageSalesIncrease: 0,
    percentageProfitIncrease: 0,
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/profit/profit/`)
      .then((response) => {
        setProfit(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profit:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (year && month !== '') {
      const currentMonth = parseInt(month);
      const currentYear = parseInt(year);
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      const filtered = profit.filter(item => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      });

      const previousFiltered = profit.filter(item => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === previousMonth &&
          itemDate.getFullYear() === previousMonthYear
        );
      });

      const combined = filtered.reduce((acc, item) => {
        const existingProduct = acc.find(
          (product) => product.productID === item.productID
        );

        if (existingProduct) {
          existingProduct.quantity += item.quantity;
          existingProduct.totalSale += item.quantity * item.price;
          existingProduct.totalProfit += item.profit;
        } else {
          acc.push({
            productID: item.productID,
            productName: item.productName,
            quantity: item.quantity,
            totalSale: item.quantity * item.price,
            totalProfit: item.profit,
            type: item.type
          });
        }

        return acc;
      }, []);

      const totalQuantity = combined.reduce((sum, item) => sum + item.quantity, 0);
      const totalSales = combined.reduce((sum, item) => sum + item.totalSale, 0);
      const totalProfit = combined.reduce((sum, item) => sum + item.totalProfit, 0);

      const mostSoldProduct = combined.reduce((max, item) => 
        item.quantity > max.quantity ? item : max, combined[0] || { productName: '', quantity: 0, totalSale: 0 }
      );
      
      const mostProfitableProduct = combined.reduce((max, item) => 
        item.totalProfit > max.totalProfit ? item : max, combined[0] || { productName: '', totalProfit: 0 }
      );

      const mostSalesProduct = combined.reduce((max, item) => 
        item.totalSale > max.totalSale ? item : max, combined[0] || { productName: '', totalSale: 0 }
      );

      const totalOnlineSales = combined.reduce((sum, item) => item.type === 'Online' ? sum + item.totalSale : sum, 0);
      const totalOfflineSales = combined.reduce((sum, item) => item.type === 'Offline' ? sum + item.totalSale : sum, 0);
      const totalOnlineProfit = combined.reduce((sum, item) => item.type === 'Online' ? sum + item.totalProfit : sum, 0);
      const totalOfflineProfit = combined.reduce((sum, item) => item.type === 'Offline' ? sum + item.totalProfit : sum, 0);

      const previousMonthProfit = previousFiltered.reduce((sum, item) => sum + item.profit, 0);
      const previousMonthSales = previousFiltered.reduce((sum, item) => sum + item.quantity * item.price, 0); 

      const percentageSalesIncrease = ((totalSales - previousMonthSales) / previousMonthSales) * 100;
      const percentageProfitIncrease = ((totalProfit - previousMonthProfit) / previousMonthProfit) * 100;

      setSummary({
        totalQuantity,
        totalSales,
        totalProfit,
        mostSoldProduct: mostSoldProduct.productName,
        mostSoldProductQuantity: mostSoldProduct.quantity,
        mostProfitableProduct: mostProfitableProduct.productName,
        mostProfitableProductProfit: mostProfitableProduct.totalProfit,
        mostSalesProduct: mostSalesProduct.productName,
        mostSalesProductAmount: mostSalesProduct.totalSale,
        totalOnlineSales,
        totalOfflineSales,
        totalOnlineProfit,
        totalOfflineProfit,
        percentageSalesIncrease,
        percentageProfitIncrease,
      });

      setPreviousMonthProfit(previousMonthProfit);
      setPreviousMonthSales(previousMonthSales);
      setFilteredProfit(combined);
    }
  }, [year, month, profit]);

  const currentDate = new Date().toLocaleDateString();
  const componentRef = useRef();

  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Profit report",
    onAfterPrint: () => alert("Profit Report is successfully generated!"),
  });

  return (
    <div className="container mx-auto my-8 mt-10">
      <div className="flex items-center justify-between  mb-4">
        <div className="mr-4">
          <label htmlFor="month" className="mr-2">
            Month:
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>Select month</option>
            {monthNames.map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-4">
          <label htmlFor="year" className="mr-2">
            Year:
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="YYYY"
            min="2000"
            max="2100"
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
        <h1 className="text-3xl font-bold mb-2">Profit Report: {monthNames[month]}/{year}</h1>
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
                Headings={["Product ID", "Product Name", "Quantity", "Total Sale", "Total Profit"]}
                style={{ width: "100%" }}
              >
                {filteredProfit.map((item, index) => (
                  <TableRow key={index}>
                    <td className="text-center">{item.productID}</td>
                    <td className="text-center">{item.productName}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{item.totalSale}</td>
                    <td className="text-center">{item.totalProfit}</td>
                  </TableRow>
                ))}
              </Table>
              <div className="mt-4">
                <h1 className="text-lg">
                  <b>Summary Information:</b>
                </h1>
                <p><b>Total Quantity sold :</b> {summary.totalQuantity}</p>
                <p><b>Total sales :</b> Rs.{summary.totalSales}.00</p>
                <p><b>Total profit :</b> Rs.{summary.totalProfit}.00</p>
                <p><b>Most sold product by quantity :</b> {summary.mostSoldProduct} with {summary.mostSoldProductQuantity} units sold</p>
                <p><b>Most sold product :</b> {summary.mostSalesProduct} with Rs.{summary.mostSalesProductAmount}.00 in sales</p>
                <p><b>Most profitable product :</b> {summary.mostProfitableProduct} with Rs.{summary.mostProfitableProductProfit}.00 in profit</p>
                <p><b>Total online sales :</b> Rs.{summary.totalOnlineSales}.00</p>
                <p><b>Total online profit :</b> Rs.{summary.totalOnlineProfit}.00</p>
                <p><b>Total offline sales :</b> Rs.{summary.totalOfflineSales}.00</p>
                <p><b>Total offline profit :</b> Rs.{summary.totalOfflineProfit}.00</p>
                <p><b>Previous month total sales :</b> Rs.{previousMonthSales}.00</p>
                <p><b>Previous month total profit :</b> Rs.{previousMonthProfit}.00</p>
                <p><b>Percentage increase in sales from last month :</b> {summary.percentageSalesIncrease.toFixed(2)}%</p>
                <p><b>Percentage increase in profit from last month :</b> {summary.percentageProfitIncrease.toFixed(2)}%</p>
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

export default ProfitReportDetails;

