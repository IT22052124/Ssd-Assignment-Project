import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FaArrowLeft } from 'react-icons/fa'; // Assuming you're using Font Awesome icons

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Navigate back one step
  };

  return (
    <button  onClick={handleClick}>
      <FaArrowLeft /> {/* Using the Font Awesome arrow left icon */}
    </button>
  );
};



export default BackButton;