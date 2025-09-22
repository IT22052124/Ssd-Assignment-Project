import React, { useState } from "react";

const Dropdown = ({ employee, date, onStatusChange , selected}) => {
  const handleChange = (e) => {
    const selectedStatus = e.target.value;
    onStatusChange(employee, date, selectedStatus);
  };

  return (
    <select onChange={handleChange} >
    {
        selected[0] && selected[0].status === "Absent" ?
        <option value="Absent" selected>Absent</option>
      :
      <option value="Absent" >Absent</option>}
      {
        selected[0] && selected[0].status === "Present" ?
        <option value="Present" selected>Present</option>
      :
      <option value="Present" >Present</option>}
    </select>
  );
};

export default Dropdown