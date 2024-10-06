"use client"
import GradeSelect from '@/app/_components/GradeSelect';
import MonthSelection from '@/app/_components/MonthSelection'
import GlobaAPI from '@/app/_services/GlobaAPI';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid';

function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState(moment());
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [attendanceList,setAttendanceList]=useState(null);
    
    const onSearchHandler=()=>{
        const month= moment(selectedMonth).format('MM/YYYY')
        GlobaAPI.GetAttendanceList(selectedGrade,month).then(resp=>
            setAttendanceList(resp?.data)
        )
    }

    return (
        <div className='p-7'>
            <h2 className='text-2xl font-bold'>Attendance</h2>
            {/* Month Selection */}
            <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
                <div className='flex gap-2 items-center'>
                    <label>Select Month:</label>
                    <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)} />
                </div>
                <div className='flex gap-2 items-center'>
                    <label>Select Grade:</label>
                    <GradeSelect selectedGrade={(value)=>setSelectedGrade(value)} />
                </div>
                <Button
                onClick={()=>onSearchHandler()}
                >Search</Button>
            </div>

            {/* Student Attendance Grid */}
            <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}/>
        </div>
    )
}

export default Attendance;
