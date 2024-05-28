import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch, faReply, faEdit, faRecycle, faI } from '@fortawesome/free-solid-svg-icons';

import Header from "../../components/header";

const ShowStudentSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state
    const [token, setToken] = useState(null);


    const fetchSchedule = async () => {
        const storedToken = localStorage.getItem('token');
        try {
            const response = await axios.get('https://api.qrdestek.com/api/scheduling/show-student-schedule/', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setSchedule(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const userIsAdmin = localStorage.getItem('userIsAdmin');

        if (storedToken && userIsAdmin=="false") {
            setToken(storedToken);
            // getHallData function here
        } else {
            setIsLoading(false); // set loading to false after token check
            setRedirect(true); // set redirect to true if there's no token
        }
        setIsLoading(false);


        fetchSchedule();
    }, []);

    
    if (redirect) {
        window.location.href = "/login";
        return null; // return null to prevent rendering
    }

    if (isLoading) {
        return null; // or return a loading spinner
    } 

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return {
            date: dateObj.toLocaleDateString(),
            time: dateObj.toLocaleTimeString()
        };
    };

    return (
        <>
            <div className="d-flex justify-content-end p-3">
                <button 
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userIsAdmin');
                        window.location.href = "/login"; // optional: user to be redirected to the login page
                    }}
                    className="btn btn-danger"
                >
                    Logout
                </button>
            </div>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Sınav Çizelgesi</h1>
                <table className="table table-striped table-hover">
                    <tbody>
                    {Object.values(schedule.reduce((acc, item) => {
                        const key = `${item.user_info.first_name} ${item.user_info.last_name}`;
                        if (!acc[key]) {
                            acc[key] = {
                                user_info: item.user_info,
                                school_number: item.school_number,
                                exams: []
                            };
                        }
                        acc[key].exams.push(item);
                        return acc;
                    }, {})).map((student, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td><strong>Student Name:</strong></td>
                                <td>{student.user_info.first_name}</td>
                            </tr>
                            <tr>
                                <td><strong>Student Surname:</strong></td>
                                <td>{student.user_info.last_name}</td>
                            </tr>
                            <tr>
                                <td><strong>School Number:</strong></td>
                                <td>{student.school_number}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                
            </div>
    
            <div className="container mt-5">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Exam Start</th>
                            <th>Exam Finish</th>
                            <th>Hall Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => {
                            const start = formatDate(item.exam_start_date);
                            const finish = formatDate(item.exam_finish_date);
    
                            return (
                                <tr key={index}>
                                    <td>{item.exam_info.name}</td>
                                    <td>{start.date} {start.time}</td>
                                    <td>{finish.date} {finish.time}</td>
                                    <td>{item.hall_info.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowStudentSchedule;