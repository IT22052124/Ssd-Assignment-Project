import React, { useState, useEffect } from "react";
import Popup from "./Components/Popup";
import axios from "axios";

const AvailabilityTable = (props) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/available/${props.deliveryId}`)
      .then((res) => {
        setAvailability(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [props.deliveryId]);

  return (
    <>
      {loading ? (
        <p>Loading availability...</p>
      ) : availability.length > 0 ? (
        availability.map((detail, index) => (
          <td key={index} className="px-6 py-4">
            Availability: {detail.available}
          </td>
        ))
      ) : (
        <td colSpan={2} className="px-6 py-4">
          Availability Not Set
        </td>
      )}
    </>
  );
};

export default AvailabilityTable;
