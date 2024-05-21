import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import Header from "../../../components/header";

const HallsDetail = (props) => {

    const [item, setItem] = useState({});

    useEffect(() => {
        setItem(props.data);
    }, [props.data])

    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Detail</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Hall</p>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Name</p>

                        <p className="text-md font-base">{item?.name}</p>
                    </div>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Year</p>

                        <p className="text-md font-base">{item?.year}</p>
                    </div>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Semester</p>

                        <p className="text-md font-base">{item?.semester}</p>
                    </div>

                    <div className="w-1/3 my-4 flex">
                        <p className="text-md font-medium w-full">Count of Students</p>

                        <p className="text-md font-base">{item?.count_of_students}</p>
                    </div>


                    <div className="pt-2">
                        <Link to="/halls" onClick={() => window.location.href = "/halls"} className="text-blue-600">Back to List</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HallsDetail;