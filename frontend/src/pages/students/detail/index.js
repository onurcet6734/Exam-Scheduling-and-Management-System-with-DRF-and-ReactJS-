import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header";
import axios from "axios";

const StudentsDetail = (props) => {

    const [item, setItem] = useState({});

    const token = localStorage.getItem('token');

    useEffect(() => {
        // const getStudentData = (token) => {
        //     axios.get(`https://api.qrdestek.com/users/`, {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //     .then(res => {
        //         setStudentData(res.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        // }

        setItem(props.data);
        // getStudentData(token);
    }, [props.data])

    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Detail</p>
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


                    <div className="pt-2">
                        <Link to="/students"  onClick={() => window.location.href="/students"} className="text-blue-600">Back to List</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentsDetail;