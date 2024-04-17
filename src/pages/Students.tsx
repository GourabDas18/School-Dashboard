
import { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import data from "../database/data.json";
import { attendance_percentage } from './Attendance';
import { Link } from 'react-router-dom';

export type eachStudentAlldata  = {
    profile_image: any;
    student_id: number; 
    name: string; 
    image:string ; 
    attendance_percentage: attendance_percentage;
    blood_group: string;
    age:string;
    address:string;
    exam_results_percentage: attendance_percentage  
}

const Students = () => {

    const [allstudentList,setAllStudentList] = useState<eachStudentAlldata[]|null>(null);
    const [filteredstudentList,setFilteredStudentList] = useState<eachStudentAlldata[]|null>(null);
    const [searched,setSearched] = useState<string>("");

    useEffect(()=>{
        let totalList:eachStudentAlldata[] = new Array(Object(data))[0].students.map((each:eachStudentAlldata)=>{
            return {
                student_id: each.student_id,
                name: each.name,
                image:each.profile_image,
                attendance_percentage: each.attendance_percentage,
                blood_group: each.blood_group,
                age:each.age,
                address:each.address,
                exam_results_percentage: each.exam_results_percentage  
            }
        });
        setAllStudentList([...totalList]);
    },[])

    useEffect(()=>{
        if(searched!==""){
            let students = allstudentList?.filter((each:eachStudentAlldata) => each.name.toUpperCase().includes(searched.toUpperCase()) || each.student_id.toString().includes(searched) || each.age.toString().includes(searched) || each.blood_group.toUpperCase().includes(searched.toUpperCase()) || each.address.toUpperCase().includes(searched.toUpperCase()));
            setFilteredStudentList([...students!]);
        }else{
            if(allstudentList){
                setFilteredStudentList([...allstudentList]);
            }
        }
    },[searched,allstudentList])

  return (

    <div className="w-screen flex flex-row max-h-dvh min-h-dvh overflow-hidden">
    <Menu active={"students"}/>
    <div className=" flex flex-1 flex-col p-4 md:p-1 my-4 md:m-0 md:mt-2 rounded-xl bg-white overflow-hidden text-gray-600">
    <h2 className=' font-semibold text-2xl p-4 w-max'>Students List of 2023</h2>

    <div className='bg-gray-100 flex flex-row items-center px-6 py-1 w-max rounded-full m-auto mb-5'>
        <label htmlFor="searchbox"><i className="fi fi-bs-search text-gray-400 text-sm mr-6"></i></label>
        <input type="text" id='searchbox' className='px-2 py-2 bg-gray-100 text-gray-500 w-[42rem] md:w-[15rem] text-sm focus:outline-none active:outline-none' placeholder='Search name' onChange={(e)=>{setSearched(e.target.value)}}/>
    </div>
    <div className='flex flex-1 xs:w-fit m-2 overflow-x-hidden md:mb-20'>
        <table className='w-full h-max table-fixed '>
          <thead className='text-sm bg-cyan-200 sticky top-0 z-10'>
            <tr className='border-collapse border-spacing-1 border-b-2'>
              <th className=' sticky top-0 text-sm p-2 w-16'>Profile</th>
              <th className=' sticky top-0 text-sm text-left p-2'>Name</th>
              <th className=' sticky top-0 text-sm text-center  p-2'>Student ID</th>
              <th className=' sticky top-0 text-sm p-2 '>Age</th>
              <th className=' sticky top-0 text-sm p-2 ' >Blood Group</th>
              <th className=' sticky top-0 text-sm p-2 '>Address</th>
            </tr>
          </thead>
          <tbody className='n'>
            {filteredstudentList?.map((each:eachStudentAlldata,i:number)=>{
              return (
                
                <tr className=' border-collapse border-spacing-1 even:bg-violet-50 odd:bg-white hover:bg-fuchsia-200 cursor-pointer' key={i}>
              <td className=' text-sm text-center p-2'><span className='flex'><img src={each.image} alt="profile pic " className='w-8 h-8 object-cover rounded-full  m-auto'/></span></td>
              <td className=' text-sm text-left p-2'><Link to={"/students/"+ each.student_id.toString()} >{each.name}</Link></td>
              <td className=' text-sm text-center p-2'><Link to={"/students/"+ each.student_id.toString()} >{each.student_id}</Link></td>
              <td className=' text-sm text-center p-2'>{each.age}</td>
              <td className=' text-sm text-center p-2'>{each.blood_group}</td>
              <td className=' text-sm text-center p-2 [overflow-wrap:anywhere]'>{each.address}</td>
                </tr>
              
              )
            })}
          </tbody>
        </table>
        </div>
    </div>
    </div>
  )
}

export default Students