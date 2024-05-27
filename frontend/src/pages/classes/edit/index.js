import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Header from "../../../components/header";

const ClassEdit = (props) => {
    const [name, setName] = useState(props.data.name);
    const [year, setYear] = useState(props.data.year);
    const [semester, setSemester] = useState(props.data.semester);
    const [students, setStudents] = useState(props.data.count_of_students);
    const [item, setItem] = useState(props.data);

    const token = localStorage.getItem('token');

    useEffect(() => {
        setName(props.data.name);
        setYear(props.data.year);
        setSemester(props.data.semester);
        setStudents(props.data.count_of_students);
        setItem(props.data);
    }, [props.data])

    const handleEdit = () => {
        const data = {
            name: name,
            year: year,
            semester: semester,
            count_of_students: students
        }
        axios.put(`https://api.qrdestek.com/api/class/update-delete/${item.id}/`, data, {
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
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Create</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Class</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Year</p>
                        <select className="w-full" value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Select a year...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Semester</p>
                        <select className="w-full" value={semester} onChange={(e) => setSemester(e.target.value)}>
                            <option value="">Select a semester...</option>
                            <option value="Sonbahar">Sonbahar</option>
                            <option value="İlkbahar">İlkbahar</option>
                        </select>
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Number Of Students</p>
                        <input className="w-full" type="number" placeholder="Please input the number of seats..." value={students} onChange={(e) => setStudents(e.target.value)} />
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleEdit()}>Save</button>

                    <div className="pt-2">
                        <Link to="/classes" onClick={() => window.location.href="/classes"} className="text-blue-600">Back to List</Link>
                    </div>
                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default ClassEdit;