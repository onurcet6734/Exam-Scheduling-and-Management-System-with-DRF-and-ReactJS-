//node modules
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPeopleGroup, faRestroom, faChalkboard, faCalendar, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="w-1/6 bg-sky-900 h-screen">
                <div className="text-white">
                    <div className="h-24 w-full bg-sky-950 items-center">
                        <p className="text-center py-8 text-lg font-medium tracking-widest">School</p>
                    </div>
                </div>

                <div className="mt-16 text-white">
                    <Link to="/halls" onClick={() => window.location.href="/halls"} >
                        <div className="pl-4 flex py-4 bg-sky-900 hover:bg-sky-950">
                            <FontAwesomeIcon icon={faHouse} className="pt-1" />
                            <p className="text-md font-medium tracking-wider px-4">Halls</p>
                        </div>
                    </Link>

                    <Link to="/students" onClick={() => window.location.href="/students"} >
                        <div className="pl-4 flex py-4 bg-sky-900 hover:bg-sky-950">
                            <FontAwesomeIcon icon={faPeopleGroup} className="pt-1" />
                            <p className="text-md font-medium tracking-wider px-4">Students</p>
                        </div>
                    </Link>

                    <Link to="/classes" onClick={() => window.location.href="/classes"} >
                        <div className="pl-4 flex py-4 bg-sky-900 hover:bg-sky-950">
                            <FontAwesomeIcon icon={faRestroom} className="pt-1" />
                            <p className="text-md font-medium tracking-wider px-4">Classes</p>
                        </div>
                    </Link>

                    <Link to="/exams" onClick={() => window.location.href="/exams"} >
                        <div className="pl-4 flex py-4 bg-sky-900 hover:bg-sky-950">
                            <FontAwesomeIcon icon={faChalkboard} className="pt-1" />
                            <p className="text-md font-medium tracking-wider px-4">Exams</p>
                        </div>
                    </Link>

                    <Link to="/schedule" onClick={() => window.location.href="/schedule"} >
                        <div className="pl-4 flex py-4 bg-sky-900 hover:bg-sky-950">
                            <FontAwesomeIcon icon={faCalendar} className="pt-1" />
                            <p className="text-md font-medium tracking-wider px-4">Schedule</p>
                        </div>
                    </Link>

                    <div 
                        className="pl-4 flex py-4 bg-sky-900 hover:bg-sky-950"
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('userIsAdmin');
                            window.location.href = "/login"; // optional: user to be redirected to the login page
                        }}
                    >
                        <FontAwesomeIcon icon={faLock} className="pt-1" />
                        <p className="text-md font-medium tracking-wider px-4">Log out</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;