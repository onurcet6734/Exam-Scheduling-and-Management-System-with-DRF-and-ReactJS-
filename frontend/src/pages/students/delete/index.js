import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";

const StudentsDelete = (props) => {

    const [item, setItem] = useState({});
    const token = localStorage.getItem('token');


    useEffect(() => {
        setItem(props.data);
    }, [props.data])

    const handleDelete = () => {
        axios.delete(`https://api.qrdestek.com/users/${item.id}/`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then(res => {

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
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Student</p>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Name</p>
                        <p className="text-md font-base">{item?.first_name}</p>
                    </div>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Surname</p>
                        <p className="text-md font-base">{item?.last_name}</p>
                    </div>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Username</p>
                        <p className="text-md font-base">{item?.username}</p>
                    </div>

                   
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleDelete()}>Delete</button>

                    <div className="pt-2">
                        <Link to="/students" onClick={() => window.location.href="/students"} className="text-blue-600">Back to List</Link>
                    </div>

                    <NotificationContainer />
                </div>
            </div>
        </>
    )
}

export default StudentsDelete;