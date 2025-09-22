import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Shared/Components/UiElements/Loader';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Card from '../../Shared/Components/UiElements/Card';
import ViewCard from './Components/ViewCardCustomer';
import CustomerHeader from "../../Shared/Components/UiElements/CustomerHeader";

const ViewFaq = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const [faq, setfaq] = useState({});



    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/faq/${id}`)
            .then((res)=> {
                setfaq(res.data);
                setLoading(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading(false);
            });
    }, [id] );

    return (
      <>
      <CustomerHeader title="Frequently Asked Questions"/>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900 mr-20">
        <ViewCard
            faq = {faq}
            loading = {loading}
            setloading = {setLoading}
          />
        </div>  
        
      </>
    );
}

export default ViewFaq;