//node modules
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSearch, faReply, faEdit, faRecycle, faI } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";

import HallsEdit from "./edit";
import HallsDelete from "./delete";
import HallsDetail from "./detail";


//custom component
import Header from "../../components/header";

const Halls = () => {
    const [token, setToken] = useState(null);
    const [hallData, setHallData] = useState([]);
    const [state, setState] = useState(0);
    const [selectItem, setSelectItem] = useState({});
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const userIsAdmin = localStorage.getItem('userIsAdmin');
        if (storedToken && userIsAdmin=="true") {
            setToken(storedToken);
        } else {
            setIsLoading(false); // set loading to false after token check
            setRedirect(true); // set redirect to true if there's no token
        }
        setIsLoading(false); // set loading to false after token check

        const getHallData = async () => {
            const getHall = (token) => {
                axios.get(`https://api.qrdestek.com/api/hall/list-create/`, {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res, state);
                    setState(0);
                    setHallData(res.data);
                })
                .catch(error => {
                    console.error(error);
                });
                console.log(state);
            }
            getHall(storedToken);
        }
        getHallData();
    }, []);

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
            {state === 0 && (
                <div className="flex">
                    <Header />

                    <div className="w-screen">
                        <p className="text-3xl font-bold p-10">Hall Management</p>

                        <Link to="/halls/create" onClick={() => window.location.href="/halls/create"}>
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
                                            <th className="pr-48">Name</th>
                                            <th>NumberOfSeats</th>
                                            <th className="w-full"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {hallData.map((item, index) => {
                                            return (
                                                <tr className="w-screen border-b-2" key={index}>
                                                    <td className="py-2">{item.name}</td>
                                                    <td className="py-2">{item.number_of_seats}</td>
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
                <HallsEdit data={selectItem} />
            )}

            {state === 2 && (
                <HallsDetail data={selectItem} />
            )}

            {state === 3 && (
                <HallsDelete data={selectItem} />
            )}
        </>
    )
}

export default Halls;