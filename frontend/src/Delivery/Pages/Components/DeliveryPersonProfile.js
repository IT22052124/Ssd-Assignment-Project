import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DeliveryAuthContext } from '../../../Shared/Components/context/DeliveryAuthContext';
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import { Link } from 'react-router-dom';
import DeliveryPersonNavbar from './deliveryNavBar';

const DeliveryPersonProfile = () => {
    const { deliveryPersonId } = useContext(DeliveryAuthContext);
    const [deliveryPerson, setDeliveryPerson] = useState({});
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState('Yes'); // Set default availability to 'Yes'

    useEffect(() => {
        console.log('DeliveryPersonProfile - deliveryPersonId:', deliveryPersonId);

        if (!deliveryPersonId) {
            console.error('deliveryPersonId is undefined or null');
            return;
        }

        setLoading(true);
        axios.get(`http://localhost:5000/delivery/${deliveryPersonId}`)
            .then((res) => {
                console.log(res.data)
                setDeliveryPerson(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [deliveryPersonId]);

    const handleAvailabilityChange = (selectedAvailability) => {
        setAvailability(selectedAvailability);
    };

    const handleSubmitAvailability = () => {
        console.log('Button clicked'); // Log a message to indicate the button was clicked
        axios.get(`http://localhost:5000/available/${deliveryPersonId}`)
            .then((res) => {
                if (res.data.length > 0) {
                    // If an availability entry already exists, update it using PUT
                    axios.put(`http://localhost:5000/available/${res.data[0]._id}`, {
                        available: availability
                    })
                    .then((updateRes) => {
                        console.log('Response:', updateRes.data); // Log the response data
                        Toast("Availability Updated!! 🔥", "success");
                    })
                    .catch((updateErr) => {
                        console.error(updateErr);
                        Toast("Failed to update availability.", "error");
                    });
                } else {
                    // If no availability entry exists, create a new one using POST
                    axios.post("http://localhost:5000/available/", {
                        delivery: deliveryPersonId,
                        available: availability
                    })
                    .then((createRes) => {
                        console.log('Response:', createRes.data); // Log the response data
                        Toast("Availability Submitted!! 🔥", "success");
                    })
                    .catch((createErr) => {
                        console.error(createErr);
                        Toast("Failed to submit availability.", "error");
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                Toast("Failed to check availability.", "error");
            });
    };

    return (
        <div>
    <DeliveryPersonNavbar />
    <div className="container mx-auto mt-10 flex justify-center items-center h-full">
        <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="flex justify-center items-center flex-col">
                    <h1 className="text-2xl font-bold mb-4">Delivery Person Profile</h1>
                    <p><strong>ID:</strong> {deliveryPerson.ID}</p>
                    <p className="my-2"><strong>Name:</strong> {deliveryPerson.name}</p>
                    <p className="my-2"><strong>Telephone:</strong> {deliveryPerson.telephone}</p>
                    <p className="my-2"><strong>Mail:</strong> {deliveryPerson.mail}</p>
                    <p className="my-2"><strong>Address:</strong> {deliveryPerson.address}</p>
                    <p className="my-2"><strong>License Number:</strong> {deliveryPerson.license}</p>
                    <p className="my-2"><strong>Number Plate:</strong> {deliveryPerson.numberplate}</p>
                    <p className="my-2"><strong>Type & Capacity:</strong> {deliveryPerson.type} ({deliveryPerson.capacity}kg)</p>
                    <p className="my-2">
                        <strong>Availability:</strong>
                        <select value={availability} onChange={(e) => handleAvailabilityChange(e.target.value)} className="border rounded-md py-1 px-2 ml-2">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </p>
                    <br />
                    <button onClick={handleSubmitAvailability} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md ml-2 focus:outline-none focus:shadow-outline">Submit Availability</button>
                </div>
            )}
        </div>
    </div>
</div>

    );
};

export default DeliveryPersonProfile;
