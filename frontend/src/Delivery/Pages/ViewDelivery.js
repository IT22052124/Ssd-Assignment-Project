import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import ViewCard from './Components/ViewDelvery';
import Header from '../../Shared/Components/UiElements/header';

const ViewDelivery = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const[loading1, setLoading1] = useState(false);
    const [delivery, setdelivery] = useState({});

    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/delivery/${id}`)
            .then((res)=> {
                setdelivery(res.data);
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
          <div className='flex-1 w-64 ...'>
          <ViewCard
            delivery = {delivery}
            loading1 = {loading1}
            setloading1 = {setLoading1}
          />
        </div>  
        </div>
      </>
    );
}

export default ViewDelivery;