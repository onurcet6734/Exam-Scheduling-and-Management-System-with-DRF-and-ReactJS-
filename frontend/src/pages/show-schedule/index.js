import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch, faReply, faEdit, faRecycle, faI } from '@fortawesome/free-solid-svg-icons';

import Header from "../../components/header";

const ShowStudentSchedule = () => {
    return (
        <>
            <div className="flex">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">
                        Öğrenci Denemesi Takvimi
                    </h1>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 border border-grey-300">Ders Adı</th>
                                <th className="py-2 border border-grey-300">Sınav Tarihi</th>
                                <th className="py-2 border border-grey-300">Sınav Saati</th>
                                <th className="py-2 border border-grey-300">Salon Adı</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-grey-300">Mühendislik Projesi</td>
                                <td className="border border-grey-300">08.06.2023</td>
                                <td className="border border-grey-300">11:00:00</td>
                                <td className="border border-grey-300">T-156</td>
                            </tr>
                            <tr>
                                <td className="border border-grey-300">Veri Çıkarımı</td>
                                <td className="border border-grey-300">08.06.2023</td>
                                <td className="border border-grey-300">11:00:00</td>
                                <td className="border border-grey-300">T-356</td>
                            </tr>
                            <tr>
                                <td className="border border-grey-300">Embedded Sistemler</td>
                                <td className="border border-grey-300">10.06.2023</td>
                                <td className="border border-grey-300">12:30:00</td>
                                <td className="border border-grey-300">T-243</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ShowStudentSchedule;