import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import 'react-notifications/lib/notifications.css';


import axios from "axios";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import Header from "../../../components/header";

const ClassesCreate = (props) => {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [students, setStudents] = useState("");
    const [item, setItem] = useState({});
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state
    const [classData, setClassData] = useState([]);
    const [classItem, setClassItem] = useState({});

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

        const getClass = (token) => {
            axios.get(`https://api.qrdestek.com/api/class/list-create/`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // setSchedule(res.data);
                setClassData(res.data);
                setClassItem(res.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
        }

        getClass(storedToken);

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
        const data = {
            name: name,
            classid: classItem.id
        }
        axios.post(`https://api.qrdestek.com/api/exam/list-create/`, data, {
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
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Exam</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Class</p>
                        <select className="w-full" onChange={(e) => setClassItem(classData[e.target.value])}>
                            {classData.map((item, index) => {
                                return (
                                    <option value={index} key={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>



                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleCreate()}>Save</button>

                    <div className="pt-2">
                        <Link to="/classes" onClick={() => window.location.href="/classes"} className="text-blue-600">Back to List</Link>
                    </div>
                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default ClassesCreate;