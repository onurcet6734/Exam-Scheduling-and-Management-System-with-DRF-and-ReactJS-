import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header";

const ExamDetail = (props) => {
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
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Exams</p>

                    
                    <div className="w-1/2 my-4 flex">
                        <p className="text-md font-medium w-full">Name</p>
                        <p className="text-md font-base w-full">{item?.name}</p>
                    </div>

                    <div className="w-1/2 my-4 flex">
                        <p className="text-md font-medium w-full">Class</p>
                        <p className="text-md font-base w-full">{item?.class_info?.name}</p>
                    </div>



                    <div className="pt-2">
                        <Link to="/exams" onClick={() => window.location.href = "/exams"} className="text-blue-600">Back to List</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamDetail;