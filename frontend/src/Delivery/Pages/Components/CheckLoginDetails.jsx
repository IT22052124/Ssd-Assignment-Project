import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import axios from "axios";

const CheckLoginDetails = (props) => {
  const [loginDetails, setLoginDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/deliverylogin/${props.deliveryId}`)
      .then((res) => {
        setLoginDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.deliveryId]);

  if (loginDetails.length > 0) {
    return (
      <>
        {loginDetails.map((detail, index) => (
          <td key={index} className="px-6 py-4">
            Username: {detail.username}  Password: {detail.password}
          </td>
        ))}
      </>
    );
  } else {
    return (
      <>
        <td colSpan={2} className="px-6 py-4">
          <Popup deliveryId={props.deliveryId} />
        </td>
      </>
    );
  }
};

export default CheckLoginDetails;
