import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import data from "../database/data.json";
import { eachStudentAlldata } from './Students';
import Menu from '../components/Menu';
import attendance from "../img/attendance.png";
import { AreaChart } from '../components/Aeachart';
import { ScriptableContext } from 'chart.js/auto';

const StudentId = () => {
    const { id } = useParams();
    const [student, setStudent] = useState<eachStudentAlldata | null>(null);
    const [attenndaceNo,setAttendanceNo] =useState<number[]|null>(null);
    const [resultNo,setResultNo] =useState<number[]|null>(null);

    useEffect(() => {
        let student:eachStudentAlldata[] = new Array(Object(data))[0].students.filter((each: eachStudentAlldata) => each.student_id.toString() === id);
        setStudent(student[0]);
        setAttendanceNo([...Object.values(student[0].attendance_percentage)]);
        setResultNo([...Object.values(student[0].exam_results_percentage)]);
    }, [id])


    return (
        <div className="w-screen flex flex-row max-h-dvh overflow-hidden">
            <Menu active={"students"} />
            <div className=" flex flex-1 flex-col p-4 md:p-1 my-4 md:m-0 md:mt-2 rounded-xl bg-gray-50 overflow-hidden md:overflow-auto text-gray-600 md:max-w-fit">
                <h2 className=' font-semibold text-2xl p-4 w-max md:w-fit md:text-wrap'>Students Details of ID : {student?.student_id}</h2>
                <hr />
                <div className='grid grid-cols-2 p-5 bg-white md:w-screen md:flex md:flex-col md:items-center md:h-max'>
                    <div className=' col-span-1 flex items-center justify-end pr-5'>
                        <div className=" bg-fuchsia-50 p-4 col-span-2 rounded-xl flex flex-col items-center">
                            <div>
                                <div> <img src="https://png.pngtree.com/thumb_back/fw800/background/20240322/pngtree-modern-background-with-liquid-rainbow-vector-image_15666232.jpg" className=" w-56 h-28 rounded-2xl" />
                                </div>
                                <div className="w-16 h-16 flex items-center justify-center border-4 border-white bg-[var(--gray)] rounded-xl absolute -bottom-8 left-4">
                                <img src={student?.profile_image} alt={student?.name} className=" rounded-full"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 mt-10 ml-5 w-full">
                                <h2 className="text-sm font-semibold">{student?.name}</h2>
                            </div>
                        </div>
                    </div>
                    <div className=' col-span-1 pl-5 md:h-max'> 
                    <table className=' border-separate  space-12'>
                        <tbody>
                        <tr className='text-xs text-gray-700 odd:bg-white font-semibold '><td className='flex items-center flex-row gap-1 py-2'><i className="fi fi-rr-fingerprint"></i><span>ID :</span></td> <td className='pl-8 p-2'>{student?.student_id}</td></tr>
                        <tr className='text-xs text-gray-700 odd:bg-white font-semibold '><td className='flex items-center flex-row gap-1 py-2'><i className="fi fi-rr-id-card-clip-alt"></i><span>NAME :</span></td> <td className='pl-8 p-2'>{student?.name}</td></tr>
                        <tr className='text-xs text-gray-700 odd:bg-white font-semibold '><td className='flex items-center flex-row gap-1 py-2'><i className="fi fi-rr-doctor"></i><span>BLOOD GROUP :</span></td> <td className='pl-8 p-2'>{student?.blood_group}</td></tr>
                        <tr className='text-xs text-gray-700 odd:bg-white font-semibold '><td className='flex items-center flex-row gap-1 py-2'><i className="fi fi-bs-marker"></i><span>ADDRESS :</span></td> <td className='pl-8 p-2'>{student?.address}</td></tr>
                        <tr className='text-xs text-gray-700 odd:bg-white font-semibold '><td className='flex items-center flex-row gap-1 py-2'><i className="fi fi-rr-test"></i><span>LAST MONTH RESULT :</span></td> <td className='pl-8 p-2'>{student?.exam_results_percentage.December} %</td></tr>
                        <tr className='text-xs text-gray-700 odd:bg-white font-semibold '><td className='flex items-center flex-row gap-1 py-2'><i className="fi fi-rr-user-check"></i><span>LAST MONTH ATTENDANCE :</span></td> <td className='p-2 pl-8'>{student?.attendance_percentage.December} %</td></tr>
                        </tbody>
                    </table>
                    </div>
                    
                </div>
                <hr />
                <div className='flex flex-row md:w-screen md:flex-col md:items-center justify-center h-80 md:h-auto md:mb-20 gap-2 mt-10'>
                    <div className='w-[48%] md:w-screen md:h-80 p-10 px-6 flex flex-col gap-2 items-center rounded-xl bg-white ' >
                    <h2 className='font-bold'>Marks Parcentage of 2023</h2>
                    <AreaChart data={{
                                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"], datasets: [{
                                    label: "Academic Flow", data: resultNo!,
                                    backgroundColor: (context: ScriptableContext<"line">) => { const ctx = context.chart.ctx; const gradient = ctx.createLinearGradient(0, 0, 0, 200); gradient.addColorStop(1, "#F69DD41F"); gradient.addColorStop(0, "#FE8FFBE5"); return gradient; },
                                    borderColor: "#82108A",
                                    borderWidth: 1,
                                    fill: true,
                                    tension: 0.1
                                }]
                            }} min={80} max={100} />
                    </div>
                    <div className='w-[48%] md:w-screen md:h-80 p-10 px-6 flex flex-col gap-2 items-center rounded-xl bg-white '>
                        <h2 className='font-bold'>Attendance Parcentage of 2023</h2>
                    <AreaChart data={{
                                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"], datasets: [{
                                    label: "Monthly attendance", data: attenndaceNo!,
                                    backgroundColor: (context: ScriptableContext<"line">) => { const ctx = context.chart.ctx; const gradient = ctx.createLinearGradient(0, 0, 0, 200); gradient.addColorStop(0, "#0E92EF79"); gradient.addColorStop(1, "#DCF0FF54");return gradient; },
                                    borderColor: "#1F42AA",
                                    borderWidth: 1,
                                    fill: true,
                                    tension: 0.1
                                }]
                            }} min={80} max={100} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentId