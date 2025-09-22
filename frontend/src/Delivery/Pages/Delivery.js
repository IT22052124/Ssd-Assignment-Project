import React, { useEffect, useState } from "react";
import axios from "axios";
import DeliveryTable from "./Components/DeliveryTable";
import Card from "../../Shared/Components/UiElements/Card"
import Navbar from "../../Shared/Components/UiElements/Navbar";
import { Link } from "react-router-dom";
import {MdOutlineAddBox} from 'react-icons/md'
import Search from "../../Shared/Components/UiElements/Search";
import Header from "../../Shared/Components/UiElements/header";

const Delivery = () => {

  const [delivery, setdelivery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDelivery, setdeleteDelivery] = useState(1);
  const [FilteredDeliveryPersons , setFilteredDeliveryPersons] = useState([]);
  const [loading , setLoading] = useState(false)
  
  useEffect(() =>{
    setLoading(true)
    axios
    .get("http://localhost:5000/delivery")
    .then(res => {
       setdelivery(res.data)
       setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setLoading(false)});
  },[deleteDelivery]);
  

  useEffect(() => {
    setFilteredDeliveryPersons(delivery);
  }, [delivery]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = delivery.filter(delivery =>
      delivery.name.toLowerCase().includes(e.target.value.toLowerCase())||
      delivery.ID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDeliveryPersons(filtered);
  };

  return (
    <>
    <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header/>
   
    <Card style={{width: "100%"}}>
    <div className="flex items-center justify-between">
      <h1 className="text-3xl my-8">Delivery Person Lists</h1>
      <Search
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  placeholder={"Search By ID / Name"}
                />
      <Link to='/Delivery/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
      </Link>
    </div>
      <DeliveryTable 
        Delivery={FilteredDeliveryPersons}
        loading={loading} 
        setloading={setLoading}
        dlt = {deleteDelivery}
        dltset={setdeleteDelivery}
        />
      </Card>
      
    </div>
    </>
  );
  };       

export default Delivery;
