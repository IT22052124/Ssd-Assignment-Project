import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Shared/Components/UiElements/Loader';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Card from '../../Shared/Components/UiElements/Card';
import ViewCard from './Components/ViewCardCustomer';
import Header from '../../Shared/Components/UiElements/header';
import InquiryFormUpdate from "./Components/FormUpdateCustomer";
import CustomerHeader from "../../Shared/Components/UiElements/CustomerHeader";

const ViewInquiry = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const [inquiry, setinquiry] = useState({});


    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/inquiry/${id}`)
            .then((res)=> {
                setinquiry(res.data);
                setLoading(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading(false);
            });
    }, [id] );

    return (
      <>
        <CustomerHeader title="Inquiry"/>      
        <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
          
          <ViewCard
            inquiry = {inquiry}
            loading = {loading}
            setloading = {setLoading}
          /> 
          <div><InquiryFormUpdate/></div>
        </div>
        
      </>
    );
}

export default ViewInquiry;