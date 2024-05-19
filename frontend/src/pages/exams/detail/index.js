import React from "react";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/header";

const ExamsDetail = () => {
    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Detail</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Exam</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name of Class</p>
                        <input className="w-full" placeholder="Please input the number of seats..." />
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save</button>

                    <div className="pt-2">
                        <Link to="/" className="text-blue-600">Back to List</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamsDetail;