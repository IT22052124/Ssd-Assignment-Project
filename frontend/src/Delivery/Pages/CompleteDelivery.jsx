import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DeliveryAuthContext } from "../../Shared/Components/context/DeliveryAuthContext";
import Table from "../../Shared/Components/UiElements/Table";
import DeliveryPersonNavbar from "./Components/deliveryNavBar";
import { toast } from "react-toastify";
import Card from "../../Shared/Components/UiElements/Card";

const DeliveryPersonOrders = () => {
  const { deliveryPersonId } = useContext(DeliveryAuthContext);
  const [orders, setOrders] = useState([]);
  const [temp, setTemp] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deliveryPersonId) {
      console.error("deliveryPersonId is undefined or null");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5000/deliveryOrder/${deliveryPersonId}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [deliveryPersonId, temp]);

  const completeDelivery = (id) => {
    axios
      .put(`http://localhost:5000/deliveryOrder/${id}`, { status: "Complete" })
      .then(() => {
        toast.success("Delivery Completed");
        setTemp(temp + 1);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to complete delivery");
      });
  };
  const Headings = ["Order ID", "Customer Name", "Location", "Action"];

  return (
    <div>
      <DeliveryPersonNavbar />
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Card style={{ width: "100%" }}>
          <div className="justify-between items-center">
            <div className="p-8">
              <h1 className="text-3xl mb-8">Pending Orders to Delivery</h1>

              <Table Headings={Headings} className="w-3/4">
                {loading ? (
                  <tr>
                    <td colSpan="4">Loading...</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td className="p-1 text-center">{order.order.orderId}</td>
                      <td className="p-1 text-center">
                        {order.order.userId?.name}
                      </td>
                      <td className="p-1 text-center">
                        {order.order.userId?.address},{" "}
                        {order.order.userId?.city}
                      </td>
                      <td className="p-1 text-center">
                        {order.status !== "Complete" && (
                          <button
                            onClick={() => completeDelivery(order._id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Complete Delivery
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryPersonOrders;
