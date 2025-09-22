import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ViewCard from './Components/ViewCard';
import Header from '../Shared/Components/UiElements/header';
import { AuthContext } from "../Shared/Components/context/authcontext";


const ViewCustomer = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const[loading1, setLoading1] = useState(false);
    const [customer, setcustomer] = useState({});
    const auth = useContext(AuthContext);

    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/customer/${auth.cusId}`)
            .then((res)=> {
                setcustomer(res.data);
                setLoading1(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading1(false);
            });
    }, [id] );


    console.log(customer)

    return (
      <>
        <div className='flex'>
          <div>
            <Header/>
          </div>
          <div className='flex-1 w-64 ...'>
          <ViewCard
            customer = {customer}
            loading1 = {loading1}
            setloading1 = {setLoading1}
          />
        </div>  
        </div>
      </>
    );
}

export default ViewCustomer;