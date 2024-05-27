import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';

import Header from "../../../components/header";

const HallsEdit = (props) => {

    const [name, setName] = useState(props.data.name);
    const [seats, setSeats] = useState(props.data.number_of_seats);
    const [item, setItem] = useState(props.data);

    useEffect(() => {
        setName(props.data.name);
        setSeats(props.data.number_of_seats);
        setItem(props.data);
    }, [props.data])

    const handleUpdate = () => {
        const data = {
            name: name,
            number_of_seats: seats
        }
    
        axios.put(`https://api.qrdestek.com/api/hall/update-delete/${item.id}/`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res);
            NotificationManager.success('Success Message', 'This data is successfully updated.');
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Edit</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Hall</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">NumberOfSeats</p>
                        <input className="w-full" placeholder="Please input the number of seats..." value={seats} onChange={(e) => setSeats(e.target.value)} />
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleUpdate()}>Save</button>

                    <div className="pt-2">
                        <Link to="/halls" onClick={() => window.location.href = "/halls"} className="text-blue-600">Back to List</Link>
                    </div>

                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default HallsEdit;