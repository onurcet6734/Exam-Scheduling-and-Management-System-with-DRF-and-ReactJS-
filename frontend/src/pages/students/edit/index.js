import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const StudentsEdit = (props) => {

    const [studentData, setStudentData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [name, setName] = useState(props.data.first_name);
    const [surName, setSurName] = useState(props.data.last_name);
    const [username, setUsername] = useState(props.data.username);
    const [selectClass, setSelectClass] = useState("");
    const [selectUser, setSelectUser] = useState("");
    const [item, setItem] = useState(props.data);

    const token = localStorage.getItem('token');

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
        getClassData(token);
        getStudentData(token);
    }, [])

    useEffect(() => {
        setName(props.data.first_name);
        setSurName(props.data.last_name);
        setUsername(props.data.username);
        setItem(props.data);
    }, [props.data])

    const handleUpdate = async () => {

        try {
            const getUser = await axios.get(`https://api.qrdestek.com/users/${item.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        
            const data = {
                username: username,
                first_name: name,
                last_name: surName,
            }
        
            await axios.patch(`https://api.qrdestek.com/users/${item.id}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            NotificationManager.success('Success Message', 'This data is successfully updated.');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Edit</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Student</p>


                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Surname</p>
                        <input className="w-full" placeholder="Please input the surname..." value={surName} onChange={(e) => setSurName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Username</p>
                        <input className="w-full" placeholder="Please input the username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>


                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleUpdate()}>Save</button>

                    <div className="pt-2">
                        <Link to="/students" onClick={() => window.location.href="/students"} className="text-blue-600">Back to List</Link>
                    </div>

                    <NotificationContainer />
                </div>
            </div>
        </>
    )
}

export default StudentsEdit;