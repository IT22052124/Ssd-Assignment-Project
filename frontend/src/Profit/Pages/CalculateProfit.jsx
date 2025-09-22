import React, { useEffect, useState } from 'react';
import Card from '../../Shared/Components/UiElements/Card';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import Header from '../../Shared/Components/UiElements/header';
import axios from 'axios';

const CalculateProfit = () => {
  const [loading, setLoading] = useState(false);
  const [profit, setProfit] = useState([]);
  const [product, setProduct] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [totalSales, setTotalSales] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/profit/profit/')
      .then((res) => {
        setProfit(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/product/')
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stripTimeFromDate = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const handleCalculate = (event) => {
    event.preventDefault();
    let filteredProfit = profit;

    if (startDate) {
      const start = stripTimeFromDate(startDate);
      filteredProfit = filteredProfit.filter((item) => stripTimeFromDate(item.date) >= start);
    }

    if (endDate) {
      const end = stripTimeFromDate(endDate);
      filteredProfit = filteredProfit.filter((item) => stripTimeFromDate(item.date) <= end);
    }

    if (selectedProduct) {
      filteredProfit = filteredProfit.filter((item) => item.productID === selectedProduct);
    }

    if (selectedType) {
      filteredProfit = filteredProfit.filter((item) => item.type === selectedType);
    }

    const totalSales = filteredProfit.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalProfit = filteredProfit.reduce((acc, item) => acc + item.profit, 0);

    setTotalSales(totalSales);
    setTotalProfit(totalProfit);
  };

  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />

        <Card className="flex" style={{ width: '100%' }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8 pl-96">Calculate Profit</h1>
          </div>
          <div className="justify-center mx-auto py-8 flex flex-row ...">
            <div className="w-96 mr-16">
              <form
                className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md border border-gray-500"
                onSubmit={handleCalculate}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startdate">
                    Start Date :
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="date"
                    id="startdate"
                    name="startdate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enddate">
                    End Date :
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="date"
                    id="enddate"
                    name="enddate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
                    Product ID :
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    id="product"
                    name="product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">All products</option>
                    {product.map((item) => (
                      <option key={item.ID} value={item.ID}>
                        {item.ID} , {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Type :
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    id="type"
                    name="type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <button
                  className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                  type="submit"
                >
                  Calculate
                </button>
              </form>
            </div>
            <div className="w-96">
              <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md border border-gray-500">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sales">
                    Total sales :
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="number"
                    id="sales"
                    name="sales"
                    value={totalSales}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profit">
                    Total profit :
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="number"
                    id="profit"
                    name="profit"
                    value={totalProfit}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CalculateProfit;
