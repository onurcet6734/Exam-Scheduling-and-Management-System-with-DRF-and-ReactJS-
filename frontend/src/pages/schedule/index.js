//node modules
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSearch, faReply, faEdit, faRecycle, faI } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";

//custom component
import Header from "../../components/header";

import ScheduleDelete from "./delete";
import ScheduleEdit from "./edit";
import ScheduleDetail from "./detail";

const Schedule = () => {
    const [token, setToken] = useState("");
    const [scheduleData, setScheduleData] = useState([]);
    const [state, setState] = useState(0);
    const [selectItem, setSelectItem] = useState({});
    const [examTime, setExamTime] = useState("");
    const [duration, setDuration] = useState("");


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const getExamData = (token) => {
            axios.get(`https://api.qrdestek.com/api/scheduling/list-create/`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // setSchedule(res.data);
                // console.log(res);
                setScheduleData(res.data);
            })
            .catch(error => {
                console.error(error);
            });
        }

        if (!storedToken) {
            window.location.href="/";
        }
        else {
            // console.log(cookies.token);
            setToken(storedToken)
        }

        getExamData(storedToken);
    }, [])

    const handleEdit = (item) => {
        setState(1);
        setSelectItem(item);
    }

    const handleDetail = (item) => {
        setState(2);
        setSelectItem(item);
    }

    const handleDelete = (item) => {
        setState(3);
        setSelectItem(item);
    }


    return (
        <>
            {state == 0 && (
                <div className="flex">
                    <Header />

                    <div className="w-screen">
                        <p className="text-3xl font-bold p-10">Scheduling Management</p>

                        <Link to="/schedule/create" onClick={() => window.location.href="/schedule/create"}>
                            <div className="px-6 flex">
                                <p className="text-lg font-medium">Create new</p>
                                <FontAwesomeIcon icon={faUserPlus} className="pt-2 px-4" />
                            </div>
                        </Link>

                        <div className="pt-6">
                            <div className="py-4 px-6 flex">
                                <input placeholder="Search Name..."/>

                                <button type="primary" className="bg-sky-500 px-3 h-10 rounded-lg text-white">
                                    <div className="flex">
                                        Search <FontAwesomeIcon icon={faSearch} className="pt-1 px-2" />
                                    </div>
                                </button>

                                <button type="primary" className="bg-slate-400 px-3 h-10 rounded-lg text-white mx-8">
                                    <div className="flex">
                                        Clear <FontAwesomeIcon icon={faReply} className="pt-1 px-2" />
                                    </div>
                                </button>
                            </div>

                            <div className="pt-4 text-sm">
                                <table className="mx-3">
                                    <thead>
                                        <tr className="w-screen border-b-4">
                                            <th className="pr-48">School Number</th>
                                            <th className="pr-48">Exam Start Date</th>
                                            <th className="pr-48">Exam End Date</th>
                                            <th className="pr-48">Duration</th>
                                            <th className="pr-48">Name of Hall</th>
                                            <th className="pr-48">Name of Exam</th>
                                            <th className="pr-48">Name of Student</th>
                                            <th className="pr-48">Name of Class</th>
                                            <th className="w-full"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {scheduleData.map((item, index) => {
                                            return (
                                                <tr className="w-screen border-b-2" key={index}>
                                                    <td className="py-2">{item.school_number}</td>
                                                    <td className="py-2">{item.exam_start_date}</td>
                                                    <td className="py-2">{item.exam_finish_date}</td>
                                                    <td className="py-2">{item.duration}</td>
                                                    <td className="py-2">{item.hall_info.name}</td>
                                                    <td className="py-2">{item.exam_info.name}</td>
                                                    <td className="py-2">{item.user_info.username}</td>
                                                    <td className="py-2">{item.class_info.name}</td>
                                                    <td className="flex items-center w-full">
                                                        <div className="flex justify-center w-full">
                                                            <button className="text-white px-2 py-1" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faEdit} className="bg-sky-500 p-2" /></button>
                                                            <button className="text-white px-2 py-1" onClick={() => handleDetail(item)}><FontAwesomeIcon icon={faI} className="bg-teal-500 p-2" /></button>
                                                            <button className="text-white px-2 py-1" onClick={() => handleDelete(item)}><FontAwesomeIcon icon={faRecycle} className="bg-rose-600 p-2" /></button>
                                                        </div>
                                                        
                                                    </td>
                                                </tr>
                                            )
                                            
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {state === 1 && (
                <ScheduleEdit data={selectItem} />
            )}

            {state === 2 && (
                <ScheduleDetail data={selectItem} />
            )}

            {state === 3 && (
                <ScheduleDelete data={selectItem} />
            )}
        </>
    )
}

export default Schedule;