import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Header from "../../../components/header";

const ClassEdit = (props) => {
    const [name, setName] = useState(props.data.name);
    const [classItem, setClassItem] = useState(props.data.classItem);
    const [item, setItem] = useState(props.data);
    const [classData, setClassData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setName(props.data.name);
        setClassItem(props.data.classItem);
        setItem(props.data);
    }, [props.data])

    useEffect(() => {
        axios.get(`https://api.qrdestek.com/api/class/list-create/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setClassData(res.data);
            setClassItem(res.data[0]);
        })
        .catch(error => {
            console.error(error);
        });
    }, [token])

    const handleEdit = () => {
        const data = {
            name: name,
            classid: classItem.id
        }
        axios.put(`https://api.qrdestek.com/api/exam/update-delete/${item.id}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
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
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Exam</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" value={name} placeholder="Please input the name..." onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Class</p>
                        <select className="w-full" value={classItem ? classData.findIndex(item => item.id === classItem.id) : ''} onChange={(e) => setClassItem(classData[e.target.value])}>
                            {classData.map((item, index) => {
                                return (
                                    <option value={index} key={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleEdit()}>Save</button>

                    <div className="pt-2">
                        <Link to="/classes" onClick={() => window.location.href="/exams"} className="text-blue-600">Back to List</Link>
                    </div>
                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default ClassEdit;