import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../../../components/header";

import { NotificationContainer, NotificationManager } from 'react-notifications';

const HallsCreate = (props) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState("");
    const [seats, setSeats] = useState("");
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const userIsAdmin = localStorage.getItem('userIsAdmin');

        if (storedToken && userIsAdmin=="true") {
            setToken(storedToken);
            // getHallData function here
        } else {
            setIsLoading(false); // set loading to false after token check
            setRedirect(true); // set redirect to true if there's no token
        }
        setIsLoading(false); // set loading to false after token check

        setItem(props.data);
    }, [props.data])

    if (redirect) {
        window.location.href = "/login";
        return null; // return null to prevent rendering
    }

    if (isLoading) {
        return null; // or return a loading spinner
    } 

    const handleCreate = () => {
        const token = localStorage.getItem('token');
        const data = {
            name: name,
            number_of_seats: seats
        }
        axios.post(`https://api.qrdestek.com/api/hall/list-create/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            NotificationManager.success('Success Message', 'This data is successfully created.');
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
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Create</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Hall</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">NumberOfSeats</p>
                        <input className="w-full" placeholder="Please input the number of seats..." onChange={(e) => setSeats(e.target.value)} />
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleCreate()}>Save</button>

                    <div className="pt-2">
                        <Link to="/halls" onClick={() => window.location.href = "/halls"} className="text-blue-600">Back to List</Link>
                    </div>

                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default HallsCreate;