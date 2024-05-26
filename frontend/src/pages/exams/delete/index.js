import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Header from "../../../components/header";
import axios from "axios";
import 'react-notifications/lib/notifications.css';


import {NotificationContainer, NotificationManager} from 'react-notifications';

const ClassesDelete = (props) => {

    const [item, setItem] = useState({});

    useEffect(() => {
        setItem(props.data);
        const token = localStorage.getItem('token');

    }, [props.data])

    const handleDelete = () => {
        axios.delete(`https://api.qrdestek.com/api/exam/update-delete/${item.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res);
            NotificationManager.success('Success message', 'This data is successfully deleted.');
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
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Delete</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Are you sure you want to delete this?</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Exam</p>

                    <div className="w-1/2 my-4 flex">
                        <p className="text-md font-medium w-full">Name</p>
                        <p className="text-md font-base w-full">{item?.name}</p>
                    </div>

                    <div className="w-1/2 my-4 flex">
                        <p className="text-md font-medium w-full">Class</p>
                        <p className="text-md font-base w-full">{item?.class_info?.name}</p>
                    </div>


                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleDelete()}>Delete</button>

                    <div className="pt-2">
                        <Link to="/" onClick={() => window.location.href="/classes"} className="text-blue-600">Back to List</Link>
                    </div>
                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default ClassesDelete;