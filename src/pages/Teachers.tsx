
import { useCallback, useEffect, useState } from 'react'
import Menu from '../components/Menu';
import data from "../database/data.json";
import { Link } from 'react-router-dom';

export type eachTeacherAlldata  = {
      id: number;
      name: string;
      gender: string;
      age: number;
      monthly_salary: number;
      total_assignments_given: number;
      study_subject: string
}

interface teacherDataWithSalary extends eachTeacherAlldata {
    showSalary : boolean
}

const Teachers = () => {

    const [allTeacherList,setAllTeacherList] = useState<teacherDataWithSalary[]|null>(null);
    const [filteredteacherList,setFilteredTeacherList] = useState<teacherDataWithSalary[]|null>(null);
    const [searched,setSearched] = useState<string>("");
    const [sortTypeAge,setSortTypeAge] = useState<string>("");

    useEffect(()=>{
        let totalList:teacherDataWithSalary[] = new Array(Object(data))[0].teachers.map((each:eachTeacherAlldata)=>{
            return {
                id: each.id,
                name: each.name,
                gender: each.gender,
                age: each.age,
                monthly_salary: each.monthly_salary,
                total_assignments_given: each.total_assignments_given,
                study_subject: each.study_subject,
                showSalary:false
            }
        });
        setAllTeacherList([...totalList]);
    },[])

    useEffect(()=>{
        if(searched!==""){
            let teachers = allTeacherList?.filter((each:eachTeacherAlldata) => each.name.toUpperCase().includes(searched.toUpperCase()) || each.id.toString().includes(searched) || each.age.toString().includes(searched) || each.study_subject.toString().includes(searched));
            setFilteredTeacherList([...teachers!]);
        }else{
            if(allTeacherList){
                setFilteredTeacherList([...allTeacherList]);
            }
        }
    },[searched,allTeacherList])

    const sortAge=useCallback(()=>{
        if(filteredteacherList && sortTypeAge===""){
            const list:teacherDataWithSalary[] = filteredteacherList?.sort((a:teacherDataWithSalary,b:teacherDataWithSalary)=>b.monthly_salary-a.monthly_salary)
            setFilteredTeacherList([...list]);
            setSortTypeAge("low");
        }else if(filteredteacherList && sortTypeAge==="low"){
            const list:teacherDataWithSalary[] = filteredteacherList?.sort((a:teacherDataWithSalary,b:teacherDataWithSalary)=>a.monthly_salary-b.monthly_salary);
            setFilteredTeacherList([...list]);
            setSortTypeAge("");
        }
    },[filteredteacherList])
    
    const showSalary=(id:number)=>{
        if(filteredteacherList){
            const list:teacherDataWithSalary[] = [...filteredteacherList];
            list?.forEach((each:teacherDataWithSalary)=>{
                if(each.id===id){
                    each.showSalary = !each.showSalary
                }
            });
            setFilteredTeacherList([...list]);
        }
    }

  return (

    <div className="w-screen flex flex-row max-h-dvh min-h-dvh overflow-hidden">
    <Menu active={"teachers"}/>
    <div className=" flex flex-1 flex-col p-4 md:p-1 my-4 md:m-0 md:mt-2 rounded-xl bg-white overflow-hidden text-gray-600">
    <h2 className=' font-semibold text-2xl p-4 w-max'>Teachers List of 2023</h2>

    <div className='bg-gray-100 flex flex-row items-center px-6 py-1 w-max rounded-full m-auto mb-5'>
        <label htmlFor="searchbox"><i className="fi fi-bs-search text-gray-400 text-sm mr-6"></i></label>
        <input type="text" id='searchbox' className='px-2 py-2 bg-gray-100 text-gray-500 w-[42rem] md:w-[15rem] text-sm focus:outline-none active:outline-none' placeholder='Search name' onChange={(e)=>{setSearched(e.target.value)}}/>
    </div>
    <div className='flex flex-1 m-2 overflow-x-hidden md:mb-20 sm:overflow-x-scroll w-full'>
        <table className='w-full sm:w-max h-max table-fixed '>
          <thead className='text-sm bg-cyan-200 sticky top-0 z-10'>
            <tr className='border-collapse border-spacing-1 border-b-2'>
              <th className=' sticky top-0 text-sm p-2 w-6 text-left'>ID</th>
              <th className=' sticky top-0 text-sm text-left p-2 sm:w-24'>Name</th>
              <th className=' sticky top-0 text-sm text-center  p-2'>Gender</th>
              <th className=' sticky top-0 text-sm p-2 '><span className='flex flex-row items-center'> 
                Age
              <i className="fi fi-rr-sort-alt ml-1" onClick={sortAge}></i>
                </span></th>
              <th className=' sticky top-0 text-sm py-2 sm:w-12' >Total Given Assigment</th>
              <th className=' sticky top-0 text-sm sm:w-28'>Subject</th>
              <th className=' sticky top-0 text-sm p-2 sm:w-32'>Monthly Salary</th>
            </tr>
          </thead>
          <tbody className='n'>
            {filteredteacherList?.map((each:teacherDataWithSalary,i:number)=>{
              return (
                
                <tr className=' border-collapse border-spacing-1 even:bg-violet-50 odd:bg-white hover:bg-fuchsia-200 cursor-pointer' key={i}>
              <td className=' text-sm text-center p-2'><span className='flex'>{each.id}</span></td>
              <td className=' text-sm text-left p-2'>{each.name}</td>
              <td className=' text-sm text-center p-2'>{each.gender}</td>
              <td className=' text-sm text-center p-2'>{each.age}</td>
              <td className=' text-sm text-center p-2'>{each.total_assignments_given}</td>
              <td className=' text-sm text-center p-2 sm:w-36'>{each.study_subject}</td>
              <td className=' text-sm text-center p-2  sm:w-32'><span className='flex flex-row items-center w-fit m-auto'> 
              <span>$&nbsp;</span>
              <input type={each.showSalary?"text":"password"} disabled className={`w-10 bg-transparent border-none focus:border-none`} value={each.monthly_salary} />
              {
                each.showSalary ? 
                <i className="fi fi-rr-eye " onClick={()=>{showSalary(each.id)}}></i>
                : <i className="fi fi-rr-eye-crossed " onClick={()=>{showSalary(each.id)}}></i>
              }
              
                </span></td>
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

export default Teachers