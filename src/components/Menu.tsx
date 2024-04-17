import { useRef } from "react";
import teacher from "../img/teacher.png";
import dashboard from "../img/dashboard.png";
import attendance from "../img/attendance.png";
import student from "../img/student.png";
import teachers from "../img/teachers.png";
import { Link } from "react-router-dom";
import { useStoreWrap } from "../database/store";

type menu = {
    active: string
}

const Menu = ({ active }: menu) => {

    const { menuChange, menuOpen } = useStoreWrap();
    const menu = useRef<HTMLDivElement>(null);
    const makeshort: () => void = () => {
        menuChange(false);
    }
    const makeslarge: () => void = () => {
        menuChange(true);
    }

    return (
        <nav className={`flex flex-col items-start md:items-center md:justify-evenly ${menuOpen ? " min-w-[12rem]" : " w-[5rem]"} menu min-h-screen overflow-hidden md:overflow-visible md:absolute md:z-10 md:bottom-0 md:w-screen md:min-h-16 md:max-h-16  md:flex-row`} ref={menu}>
            <div className={`flex flex-row items-center justify-between ${menuOpen ? "justify-between" : "justify-center"} w-full h-20 p-5 md:absolute md:-left-2 xs:mr-2 md:-top-8 md:w-max`} >
                <img src={teacher} alt="teacher" className={` bg-white rounded-full ${menuOpen ? " w-14 h-14 md:w-20 xs:w-[3rem] md:h-auto p-1" : " w-0 h-0 p-0"} `} />
                <i className={`fi fi-sr-circle-xmark ${menuOpen ? "" : " hidden"}  md:hidden`} onClick={() => { makeshort() }}></i>
                <i className={`fi fi-rr-apps ${menuOpen ? "hidden" : ""} text-2xl -left-1 md:hidden`} onClick={() => { makeslarge() }}></i>
            </div>

            <ul className="mt-10 md:ml-10 md:w-4/5 md:mt-0 flex flex-col md:flex-row md:justify-evenly md:items-center md:gap-6 gap-4 w-full xs:ml-8">
                <Link to={"/"} className="flex">
                <li className="flex flex-row w-full md:flex-col h-10 rounded-r-lg justify-start md:justify-center items-center px-8 md:px-0 cursor-pointer hover:scale-110 hover:shadow-xl hover:bg-violet-900 md:hover:bg-inherit md:hover:shadow-none">
                        <img src={dashboard} alt="dashboard" className={`w-4 h-4 md:w-3.5 md:h-3.5 ${active == "dashboard" ? " invert-[1] md:invert-[0.2] md:scale-125  " : "invert-[0.7] md:invert-[0.4]"} mb-1 md:mb-0`} />
                        <h2 className={`${active == "dashboard" ? " text-sm text-gray-100 md:text-blue-600 md:font-semibold md:text-[0.7rem] " : "text-xs text-gray-300 md:text-gray-500 "} ml-4 font-semibold md:ml-0 md:text-[0.6rem] ${menuOpen ? "" : "hidden"}`}>Dashboard</h2>
                    </li>
                </Link>
                <Link to={"/attendance"} className="flex">
                    <li className="flex flex-row w-full md:flex-col h-10 rounded-r-lg justify-start md:justify-center items-center px-8 md:px-0 cursor-pointer hover:scale-110 hover:shadow-xl hover:bg-violet-900 md:hover:bg-inherit md:hover:shadow-none">
                        <img src={attendance} alt="dashboard" className={`w-4 h-4 md:w-3.5 md:h-3.5 ${active == "attendance" ? " invert-[1] md:invert-[0.2] md:scale-125  " : "invert-[0.7] md:invert-[0.4]"} mb-1 md:mb-0`} />
                        <h2 className={`${active == "attendance" ? " text-sm text-gray-100 md:text-blue-600 md:font-semibold md:text-[0.7rem] " : "text-xs text-gray-300 md:text-gray-500 "} ml-4 font-semibold md:ml-0 md:text-[0.6rem] ${menuOpen ? "" : "hidden"}`}>Attendance</h2>
                    </li>
                </Link>

                <Link to={"/students"} className="flex">
                    <li className="flex flex-row w-full md:flex-col h-10 rounded-r-lg justify-start md:justify-center items-center px-8 md:px-0 cursor-pointer hover:scale-110 hover:shadow-xl hover:bg-violet-900 md:hover:bg-inherit md:hover:shadow-none">
                        <img src={student} alt="dashboard" className={`w-4 h-4 md:w-3.5 md:h-3.5 ${active == "students" ? " invert-[1] md:invert-[0.2] md:scale-125  " : "invert-[0.7] md:invert-[0.4]"} mb-1 md:mb-0`} />
                        <h2 className={`${active == "students" ? " text-sm text-gray-100 md:text-blue-600 md:font-semibold md:text-[0.7rem] " : "text-xs text-gray-300 md:text-gray-500 "} ml-4 font-semibold md:ml-0 md:text-[0.6rem] ${menuOpen ? "" : "hidden"}`}>Students</h2>
                    </li>
                </Link>

                <Link to={"/students"} className="flex">
                <li className="flex flex-row w-full md:flex-col h-10 rounded-r-lg justify-start md:justify-center items-center px-8 md:px-0 cursor-pointer hover:scale-110 hover:shadow-xl hover:bg-violet-900 md:hover:bg-inherit md:hover-shadow-none">
                    <img src={teachers} alt="dashboard" className={`w-4 h-4 md:w-3.5 md:h-3.5 ${active == "teachers" ? " invert-[1] md:invert-[0.2] md:scale-125  " : "invert-[0.7] md:invert-[0.4]"} mb-1 md:mb-0`} />
                    <h2 className={`${active == "teachers" ? " text-sm text-gray-100 md:text-blue-600 md:font-semibold md:text-[0.7rem] " : "text-xs text-gray-300 md:text-gray-500 "} ml-4 font-semibold md:ml-0 md:text-[0.6rem] ${menuOpen ? "" : "hidden"}`}>Teachers</h2>
                </li>
                </Link>
            </ul>


        </nav>
    )
}

export default Menu