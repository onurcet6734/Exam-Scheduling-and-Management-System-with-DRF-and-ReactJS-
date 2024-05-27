import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header";
import 'react-notifications/lib/notifications.css';


import axios from "axios";

import {NotificationContainer, NotificationManager} from 'react-notifications';

import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import "react-datepicker/dist/react-datepicker.css";

const ScheduleEdit = (props) => {

    const [examDate, setExamDate] = useState(new Date());
    const [examTime, setExamTime] = useState('10:00');
    const [FinisDate, setFinishDate] = useState(new Date());
    const [finishTime, setFinishTime] = useState('10:00');
    const [hall, setHall] = useState({});
    const [exam, setExam] = useState({});
    const [duration, setDuration] = useState("");
    const [student, setStudent] = useState({});
    const [hallsData, setHallsData] = useState([]);
    const [examsData, setExamsData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [classItem, setClassItem] = useState({});
    const [token, setToken] = useState(null);
    const [schoolNumber, setSchoolNumber] = useState("");

    const [item, setItem] = useState({});

    useEffect(() => {
        setSchoolNumber(props.data.school_number);
        setItem(props.data);
    }, [props.data])


    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        const getHall = (token) => {
            axios.get(`https://api.qrdestek.com/api/hall/list-create/`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // setSchedule(res.data);
                setHallsData(res.data);
                setHall(res.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
        }

        const getExamData = (token) => {
            axios.get(`https://api.qrdestek.com/api/exam/list-create/`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // setSchedule(res.data);
                setExamsData(res.data);
                setExam(res.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
        }

        const getStudentSchedule = (token) => {
            axios.get(`https://api.qrdestek.com/users/?is_superuser=false`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setStudentData(res.data);
                setStudent(res.data[0])
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
                // setSchedule(res.data);
                setClassData(res.data);
                setClassItem(res.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
        }


        getHall(token);
        getExamData(token);
        getStudentSchedule(token);
        getClassData(token);
    }, [])

    const handleEdit = () => {

        classData.map((it, index) => {
            
            setClassItem(it);
            let d = 0;

            const data = {
                school_number: schoolNumber,
                exam_start_date: examDate.getFullYear() + "-" + (examDate.getMonth() + 1) + "-" + (examDate.getDay() + 1) + "T" + examTime + ":00", 
                exam_finish_date: FinisDate.getFullYear() + "-" + (FinisDate.getMonth() + 1) + "-" + (FinisDate.getDay() + 1) + "T" + finishTime + ":00", 
                classid: classItem.id,
                hallid: hall.id,
                examid: exam.id,
                user: student.id,

            }

            axios.put(`https://api.qrdestek.com/api/scheduling/update-delete/${item.id}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {

                NotificationManager.success('Success Message', 'This data is successfully updated.');
                return;
            })
            .catch(error => {
                console.error(error);
                if (error.response.status == 400) {
                    NotificationManager.error('Error Message', 'Ders cakismasi');
                }
                else if (error.response.status == 404) {
                    NotificationManager.error('Error Message', 'Ters giden bir seyler var');
                }
            });
            
        })
    }

    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Edit</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Schedule</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">School Number</p>
                        <input 
                            className="w-full" 
                            placeholder="Please input the school Number..." 
                            value={schoolNumber}
                            onChange={(e) => setSchoolNumber(e.target.value)}
                        />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Exam Start Date</p>
                        <DatePicker selected={examDate} onChange={(date) => setExamDate(date)} dateFormat="MM/dd/yyyy" />
                        <TimePicker onChange={(time) => setExamTime(time)} value={examTime} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Exam Finish Date</p>
                        <DatePicker selected={FinisDate} onChange={(date) => setFinishDate(date)} dateFormat="MM/dd/yyyy" />
                        <TimePicker onChange={(time) => setFinishTime(time)} value={finishTime} />
                    </div>
                    
                    
                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Hall</p>
                        <select className="w-full" onChange={(e) => setHall(hallsData[e.target.value])}>
                            {hallsData.map((item, index) => {
                                return (
                                    <option value={index} key={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
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

                    
                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Student</p>
                        <select className="w-full" onChange={(e) => setStudent(studentData[e.target.value])}>
                            {studentData.map((item, index) => {
                                return (
                                    <option value={index} key={item.id}>{item.username}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Exam</p>
                        <select className="w-full" onChange={(e) => setExam(classData[e.target.value])}>
                            {examsData.map((item, index) => {
                                return (
                                    <option value={index} key={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleEdit()}>Save</button>

                    <div className="pt-2">
                        <Link to="/schedule" onClick={() => window.location.href="/schedule"} className="text-blue-600">Back to List</Link>
                    </div>

                    <NotificationContainer />
                </div>
            </div>
        </>
    )
}

export default ScheduleEdit;