import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import Loader from "../../Shared/Components/UiElements/Loader";
import Table from "../../Shared/Components/UiElements/Table";
import TableRow from "../../Shared/Components/UiElements/TableRow";
import Card from "../../Shared/Components/UiElements/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";
import { useReactToPrint } from "react-to-print";

const DeliveryReport = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/delivery/")
      .then((res) => {
        setDeliveryPersons(res.data);
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
      .get("http://localhost:5000/deliveryOrder/completedCount/count")
      .then((res) => {
        setCompletedDeliveries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getCompletedDeliveriesCount = (deliveryPersonId) => {
    return completedDeliveries.filter(
      (delivery) =>
        delivery.delivery._id === deliveryPersonId &&
        delivery.status === "Complete" &&
        new Date(delivery.createdAt).getMonth() + 1 === parseInt(month)
    ).length;
  };

  const getTotalCompletedDeliveries = () => {
    return completedDeliveries.filter(
      (delivery) =>
        delivery.status === "Complete" &&
        new Date(delivery.createdAt).getMonth() + 1 === parseInt(month)
    ).length;
  };

  const getTopDeliveryPerson = () => {
    let topDeliveryPerson = "";
    let maxDeliveriesCompleted = 0;
    deliveryPersons.forEach(({ _id , name}) => {
      const deliveriesCompleted = getCompletedDeliveriesCount(_id);
      if (deliveriesCompleted > maxDeliveriesCompleted) {
        maxDeliveriesCompleted = deliveriesCompleted;
        topDeliveryPerson = name;
      }
    });
    return topDeliveryPerson;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/deliveryOrder/completedCount/count?month=${month}`)
      .then((res) => {
        setCompletedDeliveries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [month]);

  const currentDate = new Date().toLocaleDateString();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Delivery Report",
    onAfterPrint: () => alert("Delivery Report is successfully generated!"),
  });

  return (
    <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Header/>
      <Card style={{ width: "100%" }}>
        <div className="justify-between items-center">
          <div className="flex items-center justify-between mb-4">
            <div className="mr-4">
              <label htmlFor="monthSelect" className="mr-2">
                Select Month:
              </label>
              <select
                id="monthSelect"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select</option>
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {new Date(0, month).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              Generate Report
            </button>
          </div>
          <div className="container mx-auto my-8" ref={componentRef}>
            <h1 className="text-3xl font-bold mb-2">Delivery Report : {new Date(0, month - 1).toLocaleString("default", { month: "long" })}</h1>
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
                    <>
                      {completedDeliveries.length > 0 ? (
                        <Table
                          Headings={["Delivery Person ID", "Delivery Person Name", "Number of Deliveries Completed"]}
                          style={{ width: "100%" }}
                        >
                          {deliveryPersons.map(({ _id, ID, name }) => (
                            <TableRow key={_id}>
                              <td className="px-6 py-4 text-center">{ID}</td>
                              <td className="px-6 py-4 text-center">{name}</td>
                              <td className="px-6 py-4 text-center">{getCompletedDeliveriesCount(_id)}</td>
                            </TableRow>
                          ))}
                        </Table>
                      ) : (
                        <p>No deliveries completed in {new Date(0, month - 1).toLocaleString("default", { month: "long" })}</p>
                      )}
                    </>
                  )}
                  <div className="mt-4">
                    <h1 className="text-lg ">
                      <b>Summary Information:</b>
                    </h1>
                    
                    <p><b>Total Number Of Deliveries Completed for the Month:</b> {getTotalCompletedDeliveries()}</p>
                    
                    <p><b>Top Delivery Person:</b> {getTopDeliveryPerson()}</p>
          
                  </div>
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
     

      </Card>
    </div>
  );
};

export default DeliveryReport;