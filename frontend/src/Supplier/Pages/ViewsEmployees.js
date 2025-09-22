import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Shared/Components/UiElements/Loader';
import Navbar from '../../Shared/Components/UiElements/Navbar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Card from '../../Shared/Components/UiElements/Card';
import SupplierProductTable from './Components/SupplierProductTable';
import ViewCard from './Components/ViewCard';
import PopUp from './Components/PopUp';
import Header from "../../Shared/Components/UiElements/header";

const ViewSupplier = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(false);
    const[loading1, setLoading1] = useState(false);
    const [deletesp , setdeletesp] = useState(1)
    const [supplier, setsupplier] = useState({});
    const [supplierProduct, setsupplierProduct] = useState([]);


    useEffect(()=> {
        setLoading(true);
        axios
            .get(`http://localhost:5000/supplier/${id}`)
            .then((res)=> {
                setsupplier(res.data);
                setLoading1(false);
            })
            .catch((err)=> {
                console.log(err);
                setLoading1(false);
            });
    }, [id] );

    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:5000/supplierproduct/supplier/${id}`)
        .then((res) => {
          setsupplierProduct(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, [id , deletesp]);

    return (
      <>
        <div className='flex'>
          <div>
            <Navbar />
            <Header/>
          </div>
          <div className='flex-1 w-64 ...'>
            <Card className="" style={{ width: "100%"} } width>
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl my-8">Products</h1>
                  <div>
                    <PopUp id= {id}/>
                  </div>
                </div>
                <SupplierProductTable
                  supplierProducts={supplierProduct}
                  loading={loading}
                  setloading={setLoading}
                  deletesp={deletesp}
                  setdeletesp={setdeletesp}
                  id={id}
                />
            </Card>
          </div>
          <div className=" bg-gray-100 p-4 flex-initial w-96 ...">
          <ViewCard
            supplier = {supplier}
            loading1 = {loading1}
            setloading1 = {setLoading1}
          />
        </div>  
        </div>
      </>
    );
}

export default ViewSupplier;