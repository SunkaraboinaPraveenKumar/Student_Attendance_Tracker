"use client"
import {useEffect, useState} from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobaAPI from '@/app/_services/GlobaAPI'
import StudentListTable from './_components/StudentListTable'

function Student() {
  useEffect(()=>{
    GetAllStudents();
  },[])
  const [studentInfo,setSetStudentInfo]=useState([]);
  const GetAllStudents=()=>{
    GlobaAPI.GetAllStudents().then(resp=>{
      // console.log(resp.data);
      setSetStudentInfo(resp.data);
    })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center mb-5'>Students
        <AddNewStudent
        refreshData={GetAllStudents}
        />
        </h2>
        <StudentListTable studentList={studentInfo}
        refreshData={GetAllStudents}/>
    </div>
  )
}

export default Student