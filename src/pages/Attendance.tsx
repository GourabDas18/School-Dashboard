import { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import data from "../database/data.json";
import { BarChart } from '../components/Barchart';

export type attendance_percentage = {
  [x: string]: number;
}
export type eachStudent = {
  profile_image: string,
  student_id: number; 
  name: string; 
  image:string ; 
  attendance_percentage: attendance_percentage;
  attendance:number
}



const Attendance = () => {

  const [month,setMonth]=useState<string>("December");
  const [studentName,setStudentName] = useState<string[]|null>(null);
  const [attendanceData,setAttendanceData] = useState<number[]|null>(null);
  const [studentList,setStudentList] = useState<eachStudent[]|null>(null)

  const avarageCount : (no:attendance_percentage) => number = (no:attendance_percentage)=>{
    let total = Object.values(no).reduce((x:number,y:number)=>x+y);
    let avg = total/Object.values(no).length;
    return avg;
  }

  useEffect(()=>{
    let students = new Array(Object(data))[0].students.map((each: eachStudent)=>{return {student_id:each.student_id,name:each.name,image:each.profile_image,attendance: each.attendance_percentage[month],avarage:avarageCount(each.attendance_percentage)}}) 
    students.sort((a:eachStudent,b:eachStudent)=> b.attendance - a.attendance);
    setStudentName([...students.map((each:eachStudent) => {return each.name})]);
    setAttendanceData([...students.map((each:eachStudent) => {return each.attendance})]);
    setStudentList([...students]);
  },[month])



  return (
    <div className="w-screen flex flex-row max-h-dvh overflow-hidden">
    <Menu active={"attendance"}/>
    <div className=" flex flex-1 p-4 md:p-1 my-4 md:m-0 md:mt-2 rounded-xl bg-white flex-wrap overflow-hidden text-gray-600">
        <div className='flex flex-col w-full'>
           <div className='flex flex-row items-center justify-between'> 
            <h2 className=' font-semibold text-2xl p-4 w-max'>Students Attendance of 2023</h2>
            <div className='px-8'>
                <label htmlFor="month">Month : </label>
                <select defaultValue={"December"} id='month' className=' bg-gray-100 text-xs px-5 py-2 text-blue-500 font-semibold focus:outline-none' onChange={(e)=>{setMonth(e.currentTarget.value)}}>
                <option value="January">JANUARY</option>
                <option value="February">FEBRUARY</option>
                <option value="March">MARCH</option>
                <option value="April">APRIL</option>
                <option value="May">MAY</option>
                <option value="June">JUNE</option>
                <option value="July">JULY</option>
                <option value="August">AUGUST</option>
                <option value="September">SEPTEMBER</option>
                <option value="October">OCTOBER</option>
                <option value="November">NOVEMBER</option>
                <option value="December">DECEMBER</option>
            </select>
            </div>
            </div>
           <hr />
        <div className='h-[17rem] md:p-2'>
        <BarChart data={{labels:studentName!,datasets:[   
        {
          label:`Attendance of ${month}`,
          data : attendanceData!,
          backgroundColor: "#48BFFF81",
          borderColor: "#1CD9FF",
          borderWidth: 1,
          borderRadius : 2,
        }]}}
        max={100}
        min={60}
        />
        </div>
        <div className='flex flex-[0.45] overflow-scroll'>
        <table className='w-full'>
          <thead className='text-sm bg-cyan-200 sticky top-0 z-10'>
            <tr className='border-collapse border-spacing-1 border-b-2'>
              <th className=' sticky top-0 text-sm p-2'>SL No.</th>
              <th className=' sticky top-0 text-sm text-left p-2'>Name</th>
              <th className=' sticky top-0 text-sm text-center p-2'>Student ID</th>
              <th className=' sticky top-0 text-sm p-2'>Attendance %</th>
              <th className=' sticky top-0 text-sm p-2'>Month</th>
              <th className=' sticky top-0 text-sm p-2'>Avarage</th>
            </tr>
          </thead>
          <tbody className='n'>
            {studentList?.map((each:eachStudent,i:number)=>{
              return (
                <tr className=' border-collapse border-spacing-1 even:bg-violet-50 odd:bg-white' key={i}>
              <td className=' text-sm text-center p-2'>{i+1}.</td>
              <td className=' text-sm text-left p-2'>{each.name}</td>
              <td className=' text-sm text-center p-2'>{each.student_id}</td>
              <td className=' text-sm text-center p-2'>{each.attendance} %</td>
              <td className=' text-sm text-center p-2'>{month}</td>
              <td className=' text-sm text-center p-2'>{}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>

        </div>
    </div>
    </div>
  )
}

export default Attendance;