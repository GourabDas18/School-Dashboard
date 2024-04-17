import Menu from "../components/Menu"
import hand from "../img/waving-hand.png";
import logo from "../img/logo.png";
import { CourseContainer, lessondata } from "../components/widget";
import attendance from "../img/attendance.png";
import { BarChart } from "../components/Barchart";
import { useCallback, useEffect, useState } from "react";
import data from "../database/data.json";
import { AreaChart } from "../components/Aeachart";
import {ScriptableContext} from "chart.js";
import lessonPlan from "../database/subjects.json";

type studentInfo = { name: string; number: number; image: string; attendance : attendanceType ;  address: string};
interface attendanceType {
   [ key: string ] : number
}
type eachLessonPlan = {
    "name": string;
    "assignments": number;
    "duration_minutes": number;
    "lesson": number;
    "subject_code": string;
    "image": string;
    "complete": number
}
const Home = () => {

    const [dataLabelName, setDataLabelName] = useState<string[]>([]);
    const [dataLabelNumber, setDataLabelNumber] = useState<number[]>([]);
    const [bestStudent, setBestStudent] = useState<studentInfo | null>(null);
    const [avarageAttendance, setAvarageAttendance] = useState <number[] | null>(null);

    const avgMonthWise = useCallback(( array : number[])=>{
        let total = array.reduce((a,b)=> a+b);
        return total/20;
    },[])

    useEffect(() => {
        let results: studentInfo [] = data.students.map(each => { return { name: each.name, number: each.exam_results_percentage.December, image: each.profile_image, attendance: each.attendance_percentage , address: each.address } })
        results.sort((a, b) => b.number - a.number);
        let avg:number[] = [];
        for (let i = 0; i < 12; i++) {
            let totalAttendanceforAll:number[] = [];
            let monthName = Object.keys(results[0].attendance)[i];
            results.forEach((each:studentInfo)=> totalAttendanceforAll.push(each.attendance[monthName]));
            avg.push(avgMonthWise(totalAttendanceforAll)) 
        }
        setAvarageAttendance([...avg]);
        setBestStudent(results[0]);
        results.splice(3, results.length);
        setDataLabelName([...results.map(each => { return each.name })]);
        setDataLabelNumber([...results.map(each => { return each.number })]);
    }, [])

    return (
        <div className="w-screen flex flex-row max-h-dvh justify-start ">
            <Menu active={"dashboard"}/>
            <div className="flex flex-col items-center max-h-[100dvh] md:w-screen ">

                <div className=" flex flex-1 items-center h-full justify-center p-4 md:p-1 my-4 md:m-0 rounded-xl md:rounded-[3rem] bg-white flex-wrap overflow-hidden md:overflow-y-auto md:mt-2 ">
                    {/* LEFT PART HOME SCREEN */} 
                    <div className="flex flex-col w-1/3 max-h-[98%] md:w-screen bg-white text-slate-700 px-5 py-2 md:p-6 ">
                        <div className="flex flex-row items-center ">
                            <img src={logo} alt="logo" className="w-12 mr-5" /> <h1 className="text-3xl font-bold md:text-wrap ">Quantum Nexus School</h1>
                        </div>
                        <hr className="my-5" />
                        <div>
                            <div className="flex flex-row items-end gap-2">
                                <p className="text-2xl font-bold">Hello ,</p> <span className="text-xl">admin</span>
                                <img src={hand} alt="waving hand" className="w-8 h-8 ml-5 hand" />
                            </div>
                            <p className="text-sm">Good Afternoon.</p>
                        </div>
                        <div className="my-8">
                            <h2 className="font-bold">Today's Courses</h2>
                            <div className=" max-h-96 w-[105%] md:w-full md:flex md:flex-col md:gap-2 md:items-center my-5 ml-5 md:ml-0 overflow-x-hidden overflow-y-scroll">
                               {Array.from(lessonPlan).map((each : eachLessonPlan)=>{
                                return <CourseContainer name={each.name} lesson={each.lesson} assignment={each.assignments} duration={each.duration_minutes} complete={each.complete} logo={each.image} />
                               })}
                                
                            </div>

                        </div>
                    </div>
                    {/* RIGHT PART HOME SCREEN */}
                    <div className="flex flex-col w-2/3 h-[98%] md:h-max md:w-screen bg-[var(--gray)] rounded-3xl px-5  md:px-0 text-slate-700">
                        {/* RIGHT PANEL TOP PART */}
                        <div className="grid grid-cols-6 gap-10 p-2 md:p-5  md:flex md:flex-col md:items-center md:w-full md:px-0">
                            {/* STUDENT PART */}
                            <div className="bg-white p-4 pt-0 col-span-2 md:col-span-6 rounded-xl flex flex-col items-center">
                                <h2 className="text-xs font-semibold mb-1"><span className="text-2xl">👑</span> Best Perfomer of December , 2023</h2>
                                <div>
                                    <div> <img src="https://png.pngtree.com/thumb_back/fw800/background/20240322/pngtree-modern-background-with-liquid-rainbow-vector-image_15666232.jpg" className=" w-56 h-28 md:h-36 rounded-2xl" />
                                    </div>
                                    <div className="w-16 h-16 flex items-center justify-center border-4 border-white bg-[var(--gray)] rounded-xl absolute -bottom-8 left-4">
                                        <img src={bestStudent?.image} alt={bestStudent?.name} className=" rounded-full"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 mt-10 ml-14 md:mx-14 md:items-center w-full">
                                    <h2 className="text-sm font-semibold">{bestStudent?.name}</h2>
                                    <p className="text-xs">{bestStudent?.address}</p>
                                </div>
                                <div className="flex flex-row justify-around md:justify-center md:gap-5 mt-4 items-center w-full">
                                    <div className="flex flex-col justify-start items-start bg-[var(--gray)] p-3 gap-1 rounded-2xl w-20">
                                        <div className="flex justify-center items-center p-2 rounded-2xl w-max bg-white ">
                                            <img src={attendance} alt="Attendance" className="w-3 h-3" /></div>
                                        <p className="text-md text-blue-500 font-semibold">{bestStudent?.attendance.December} %</p>
                                        <p className="text-[0.7rem] m-0 -mt-2 text-gray-500">Attendance</p>
                                    </div>
                                    <div className="flex flex-col justify-start items-start bg-[var(--gray)] p-3 gap-1 rounded-2xl w-20">
                                        <div className="flex justify-center items-center p-2 rounded-2xl w-max bg-white ">
                                            <i className="fi fi-sr-test w-3 h-3 text-gray-600"></i></div>
                                        <p className="text-md text-blue-500 font-semibold">{bestStudent?.number} %</p>
                                        <p className="text-[0.7rem] m-0 -mt-2 text-gray-500">Score</p>
                                    </div>
                                </div>
                            </div>
                            {/* OTHERS PART */}
                            <div className=" col-span-4 md:col-span-6 h-max flex flex-col items-center">
                                <div className=" h-max md:h-80  w-full flex items-center py-2  rounded-2xl  justify-center bg-white">
                                    <BarChart data={{ labels: dataLabelName, datasets: [{ label: "Top Performer of December", data: dataLabelNumber, backgroundColor: "rgb(101 90 254 / 50%)", borderRadius: 15, borderColor: "rgb(101, 90, 254)", borderWidth: 2 }] }} max={100} min={50}/>
                                </div>
                                <div className="flex flex-row md:flex-wrap md:gap-10 md:justify-around md:my-8 items-center justify-evenly p-5 w-full">
                                    <div className="flex flex-col bg-fuchsia-200 p-3 rounded-xl shadow-sm cursor-pointer hover:scale-105 w-44">
                                        <div className="bg-fuchsia-50 w-8 h-8 flex justify-center items-center rounded-2xl mb-3 mt-1">
                                            <i className="fi fi-sr-chalkboard-user text-fuchsia-800"></i>
                                        </div>
                                        <h2 className="font-semibold text-fuchsia-800">Teachers</h2>
                                        <p className="text-[0.65rem] text-fuchsia-700">Assign a teacher. <br></br> Check their classes.</p>
                                        <i className="fi fi-sr-share-square absolute right-2 top-2 text-violet-800"></i>
                                    </div>

                                    <div className="flex flex-col bg-fuchsia-200 p-3 rounded-xl shadow-sm cursor-pointer hover:scale-105 w-44">
                                        <div className="bg-fuchsia-50 w-8 h-8 flex justify-center items-center rounded-2xl mb-3 mt-1">
                                            <i className="fi fi-sr-user-graduate text-fuchsia-800"></i>
                                        </div>
                                        <h2 className="font-semibold text-fuchsia-800">Students</h2>
                                        <p className="text-[0.65rem] text-fuchsia-700">Check student's details. <br></br> Check their classes.</p>
                                        <i className="fi fi-sr-share-square absolute right-2 top-2 text-violet-800"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RIGHT PANEL BOTTOM PART */}
                        <div className="flex flex-col  h-60 md:h-64 md:mb-24 md:p-4">
                            <h2 className="text-gray-600 font-semibold capitalize">Attendance for 1 year</h2>
                            <hr />
                            <AreaChart data={{
                                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"], datasets: [{
                                    label: "Monthly attendance", data: avarageAttendance!,
                                    backgroundColor: (context: ScriptableContext<"line">) => { const ctx = context.chart.ctx; const gradient = ctx.createLinearGradient(0, 0, 0, 200); gradient.addColorStop(0, "#EFACFB"); gradient.addColorStop(1, "#D076F749"); return gradient; },
                                    borderColor: "#f248ff",
                                    borderWidth: 1,
                                    fill: true,
                                    tension: 0.5
                                }]
                            }} min={80} max={100}/>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home