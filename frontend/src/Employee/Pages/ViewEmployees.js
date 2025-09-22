import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Shared/Components/UiElements/Loader';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Card from '../../Shared/Components/UiElements/Card';

import ViewCard from './Components/ViewEmployee';

import Header from "../../Shared/Components/UiElements/header";

const ViewSupplier = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const[loading1, setLoading1] = useState(false);
    const [deletesp , setdeletesp] = useState(1)
    const [employee, setemployee] = useState({});
    const [supplierProduct, setsupplierProduct] = useState([]);


    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/employee/${id}`)
            .then((res)=> {
                setemployee(res.data);
                setLoading1(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading1(false);
            });
    }, [id] );

   

    return (
      <>
        <div className='flex'>
          <div>
            <Navbar />
            <Header/>
          </div>
          
          
          <ViewCard
            employee = {employee}
            loading1 = {loading1}
            setloading1 = {setLoading1}
          />
        
        </div>
      </>
    );
}

export default ViewSupplier;