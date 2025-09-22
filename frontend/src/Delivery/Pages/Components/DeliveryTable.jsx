import React, { useState, useEffect } from "react";
import Loader from "../../../Shared/Components/UiElements/Loader";
import Table from "../../../Shared/Components/UiElements/Table";
import TableRow from "../../../Shared/Components/UiElements/TableRow";
import ThreeDotDropdown from "../../../Shared/Components/UiElements/ThreeDotDropdown";
import CheckLoginDetails from "./CheckLoginDetails";
import axios from "axios";
import AvailabilityTable from "../Available";

const DeliveryTable = (props) => {
  const [loading, setLoading] = useState(false);

  const Headings = [
    "#",
    "ID",
    "Name",
    "Telephone",
    "Mail",
    "Address",
    "License Number",
    "Number Plate",
    "Type & Capacity",
    "Action",
    "Set Username and Password",
    "Available"
  ];

  const handleForceRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a delay for the loader
  };

  return (
    <>
      <Table Headings={Headings}>
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          props.Delivery.map((item, index) => {
            return (
              <TableRow key={item._id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.ID}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.telephone}</td>
                <td className="px-6 py-4">{item.mail}</td>
                <td className="px-6 py-4">{item.address}, {item.city}</td>
                <td className="px-6 py-4">{item.license}</td>
                <td className="px-6 py-4">{item.numberplate}</td>
                <td className="px-6 py-4">{item.type}({item.capacity}kg)</td>
                <td className="px-6 py-4">
                  <ThreeDotDropdown
                    link1={`/Delivery/view/${item._id}`}
                    link2={`/Delivery/update/${item._id}`}
                    deleteLink={`http://localhost:5000/delivery/${item._id}`}
                    dlt={props.dlt}
                    dltset={props.dltset}
                    handleForceRefresh={handleForceRefresh}
                  />
                </td>
                <CheckLoginDetails
                  deliveryId={item._id}
                  handleForceRefresh={handleForceRefresh}
                />
                <AvailabilityTable deliveryId={item._id} />               
              </TableRow>
            );
          })
        )}
      </Table>
    </>
  );
};

export default DeliveryTable;
