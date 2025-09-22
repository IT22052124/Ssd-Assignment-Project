import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import Card from "../../../Shared/Components/UiElements/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../Shared/Components/UiElements/Navbar";
import Header from "../../../Shared/Components/UiElements/header";

const AssignDelivery = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/deliveryOrder/getOrders/")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Failed to fetch orders. Check server status.");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/available")
      .then((res) => {
        setDeliveryPersons(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch delivery persons. Check server status.");
      });
  }, []);

  const handleSelectChange = (e, orderId) => {
    const personId = e.target.value;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [orderId]: personId
    }));
  };

  const handleDeliveryComplete = (orderId , id) => {
    const selectedPersonId = selectedOptions[orderId];
    if (selectedPersonId) {
      axios.post("http://localhost:5000/deliveryOrder", {
        order: id,
        delivery: selectedPersonId,
        status: "Assigned"
      })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
        setSelectedOptions((prevSelectedOptions) => {
          const updatedOptions = { ...prevSelectedOptions };
          delete updatedOptions[orderId];
          return updatedOptions;
        });
        toast.success("Delivery is Assigned!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to assign delivery. Check server status.");
      });
    }
  };

  const Headings = [
    "Order ID",
    "Customer Name",
    "Assign Delivery Persons",
    "Assigned Delivery Person",
    "Action"
  ];

  const getAvailablePersons = (currentOrderId) => {
    const selectedPersonIds = Object.values(selectedOptions).filter(
      (personId) => personId !== "" && personId !== null
    );
    const selectedPersonId = selectedOptions[currentOrderId];

    return deliveryPersons.filter(
      (person) =>
        !selectedPersonIds.includes(person.delivery._id) ||
        person.delivery._id === selectedPersonId
    );
  };

  const ordersByCity = orders.reduce((acc, order) => {
    const city = order.userId.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(order);
    return acc;
  }, {});

  const cities = Object.keys(ordersByCity);

  const tableContainerStyle = {
    maxHeight: "500px", // Set the max height as needed
    overflowY: "scroll",
  };

  return (
    <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Header />

      <Card style={{ width: "100%" }}>
        <div className="justify-between items-center">
          <div className="p-8">
            <h1 className="text-3xl mb-8">Assign Delivery Persons</h1>
            <div className="table-container" style={tableContainerStyle}>
              {cities.map((city) => (
                <React.Fragment key={city}>
                  <h2 className="text-2xl mt-4 mb-2 font-semibold">{city} Orders</h2>
                  <Table Headings={Headings}>
                    {loading ? (
                      <tr>
                        <td colSpan="5">
                          <Loader />
                        </td>
                      </tr>
                    ) : ordersByCity[city].map(({ _id , orderId, userId }) => {
                        const selectedPersonId = selectedOptions[orderId];
                        const availablePersons = getAvailablePersons(orderId);

                        return (
                          <TableRow key={orderId}>
                            <td className="px-6 py-4">{orderId}</td>
                            <td className="px-6 py-4">{userId.name}</td>
                            <td className="px-6 py-4">
                              <select
                                className="border border-gray-300 rounded px-4 py-2 mr-4"
                                value={selectedPersonId || ""}
                                onChange={(e) => handleSelectChange(e, orderId)}
                              >
                                <option key="" value="">
                                  Select a Delivery Person
                                </option>
                                {availablePersons.map((person) => (
                                  <option key={person.delivery._id} value={person.delivery._id}>
                                    {person.delivery.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td
                              className="px-6 py-4"
                              style={{
                                color:
                                  availablePersons.length === 0
                                    ? "red"
                                    : selectedPersonId
                                    ? "green"
                                    : "red"
                              }}
                            >
                              {availablePersons.length === 0
                                ? "No Delivery Person Available"
                                : selectedPersonId
                                ? deliveryPersons.find(
                                    (person) => person.delivery._id === selectedPersonId
                                  )?.delivery.name || "Not Assigned"
                                : "Not Assigned"}
                            </td>
                            <td>
                              {selectedPersonId && (
                                <button
                                  onClick={() => handleDeliveryComplete(orderId , _id)}
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  Assign Delivery
                                </button>
                              )}
                            </td>
                          </TableRow>
                        );
                      })}
                  </Table>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssignDelivery;