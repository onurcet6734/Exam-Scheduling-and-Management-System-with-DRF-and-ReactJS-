//node modules
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSearch, faReply, faEdit, faRecycle, faI } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

//custom component
import Header from "../../components/header";

const Exams = () => {
    return (
        <>
            <div className="flex">
                <Header />

                <div className="w-screen">
                    <p className="text-3xl font-bold p-10">Exam Management</p>

                    <Link to="/exams/create" onClick={() => window.location.href="/exams/create"}>
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
                                        <th className="pr-48">Name of Class</th>
                                        <th className="w-full"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="w-screen border-b-2">
                                        <td className="py-2">Engineering Project</td>
                                        <td className="py-2">Computer Engineering</td>
                                        <td className="flex items-center w-full">
                                            <div className="flex justify-center w-full">
                                                <button className="text-white px-2 py-1"><FontAwesomeIcon icon={faEdit} className="bg-sky-500 p-2" /></button>
                                                <button className="text-white px-2 py-1"><FontAwesomeIcon icon={faI} className="bg-teal-500 p-2" /></button>
                                                <button className="text-white px-2 py-1"><FontAwesomeIcon icon={faRecycle} className="bg-rose-600 p-2" /></button>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exams;