import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./pages/auth/login";
import Halls from "./pages/halls";
import HallsCreate from "./pages/halls/create";
import Schedule from "./pages/schedule";
import ScheduleCreate from "./pages/schedule/create";
import Students from "./pages/students";
import StudentsCreate from "./pages/students/create";
import Classes from "./pages/classes";
import ClassesCreate from "./pages/classes/create";
import Exams from "./pages/exams";
import ExamsCreate from "./pages/exams/create";

const MainRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/halls" element={<Halls />} />
                <Route path="/halls/create" element={<HallsCreate />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/schedule/create" element={<ScheduleCreate />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/create" element={<StudentsCreate />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/classes/create" element={<ClassesCreate />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/exams/create" element={<ExamsCreate />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default MainRouter;