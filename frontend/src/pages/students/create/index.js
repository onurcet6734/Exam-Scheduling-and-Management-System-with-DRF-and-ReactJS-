import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header";
import axios from "axios";
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';

const StudentsCreate = () => {
    const [studentData, setStudentData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [selectUser, setSelectUser] = useState("");
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state


    const getStudentData = (token) => {
        axios.get(`https://api.qrdestek.com/users/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setStudentData(res.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const getClassData = (token) => {
        axios.get(`https://api.qrdestek.com/api/class/list-create/`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setClassData(res.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

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

        getClassData(token);
        getStudentData(token);
    }, [])

    if (redirect) {
        window.location.href = "/login";
        return null; // return null to prevent rendering
    }

    if (isLoading) {
        return null; // or return a loading spinner
    } 
    

    const handleCreate = () => {

        const data = {
            password: `${name}${surName}123`,
            username: selectUser,
            first_name: name,
            last_name: surName,
            email: `${name}.${surName}@aydin.edu.tr`,
            is_staff: true,
            is_active: true,
            date_joined: new Date().toISOString(),
            is_superuser: false,
            groups: [],
            user_permissions: []
        }
        
        axios.post(`https://api.qrdestek.com/users/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
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
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Student</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Surname</p>
                        <input className="w-full" placeholder="Please input the name..." onChange={(e) => setSurName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Username</p>
                        <input className="w-full" placeholder="Please input the username..." onChange={(e) => setSelectUser(e.target.value)} />
                    </div>

                  

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleCreate()}>Save</button>

                    <div className="pt-2">
                        <Link to="/students" onClick={() => window.location.href="/students"} className="text-blue-600">Back to List</Link>
                    </div>

                    <NotificationContainer />
                </div>
            </div>
        </>
    )
}

export default StudentsCreate;