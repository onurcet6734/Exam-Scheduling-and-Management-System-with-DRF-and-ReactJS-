//node modules
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSearch, faReply, faEdit, faRecycle, faI } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header";

import ClassesCreate from "./create";
import ClassesDelete from "./delete";
import ClassesEdit from "./edit";
import ClassesDetail from "./detail";

const Classes = () => {
    const [token, setToken] = useState("");
    const [classData, setClassData] = useState([]);
    const [state, setState] = useState(0);
    const [selectItem, setSelectItem] = useState({});
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state
    const [searchTerm, setSearchTerm] = useState("");
    const [clearButtonClicked, setClearButtonClicked] = useState(false);


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

        const getClassData = (token) => {
            axios.get(`https://api.qrdestek.com/api/class/list-create/`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(token);
                console.log(res);
                setState(0);
                setClassData(res.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    
        getClassData(storedToken);
    }, [clearButtonClicked])
    
    if (redirect) {
        window.location.href = "/login";
        return null; // return null to prevent rendering
    }

    if (isLoading) {
        return null; // or return a loading spinner
    } 

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
                        <p className="text-3xl font-bold p-10">Class Management</p>

                        <Link to="/classes/create" onClick={() => window.location.href="/classes/create"}>
                            <div className="px-6 flex">
                                <p className="text-lg font-medium">Create new</p>
                                <FontAwesomeIcon icon={faUserPlus} className="pt-2 px-4" />
                            </div>
                        </Link>

                        <div className="pt-6">
                            <div className="py-4 px-6 flex">
                                <input placeholder="Search Name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

                                <button type="primary" className="bg-sky-500 px-3 h-10 rounded-lg text-white" onClick={() => setClassData(classData.filter(item => item.name.includes(searchTerm)))}>
                                    <div className="flex">
                                        Search <FontAwesomeIcon icon={faSearch} className="pt-1 px-2" />
                                    </div>
                                </button>

                                <button 
                                    type="primary" 
                                    className="bg-slate-400 px-3 h-10 rounded-lg text-white mx-8"
                                    onClick={() => setClearButtonClicked(!clearButtonClicked)} // clearButtonClicked durumunu güncelle
                                >
                                    <div className="flex">
                                        Clear <FontAwesomeIcon icon={faReply} className="pt-1 px-2" />
                                    </div>
                                </button>
                            </div>

                            <div className="pt-4 text-sm">
                                <table className="mx-3">
                                    <thead>
                                        <tr className="w-screen border-b-4">
                                            <th className="pr-48">Name</th>
                                            <th className="pr-48">Year</th>
                                            <th className="pr-48">SemeSter</th>
                                            <th className="pr-48">Number Of Students</th>
                                            <th className="w-full"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {classData.map((item, index) => {
                                            return (
                                                <tr className="w-screen border-b-2" key={index}>
                                                    <td className="py-2">{item.name}</td>
                                                    <td className="py-2">{item.year}</td>
                                                    <td className="py-2">{item.semester}</td>
                                                    <td className="py-2">{item.count_of_students}</td>
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
                <ClassesEdit data={selectItem} />
            )}

            {state === 2 && (
                <ClassesDetail data={selectItem} />
            )}

            {state === 3 && (
                <ClassesDelete data={selectItem} />
            )}
            
        </>
    )
}

export default Classes;