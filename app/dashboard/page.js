"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';
import moment from 'moment';
import GlobaAPI from '../_services/GlobaAPI';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponent from './_components/PieChartComponent';

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedGrade, setSelectedGrade] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    if (selectedGrade && selectedMonth) {
      GetTotalPresentCountByday();
      getStudentAttendance();
    }
  }, [selectedMonth, selectedGrade]);

  const getStudentAttendance = () => {
    if (selectedGrade && selectedMonth) {
      GlobaAPI.GetAttendanceList(selectedGrade, moment(selectedMonth).format('MM/yyyy'))
        .then(resp => {
          setAttendanceList(resp?.data);
        })
        .catch(error => {
          console.error("Error fetching attendance data:", error); // Debugging line
        });
    }
  };

  const GetTotalPresentCountByday = () => {
    GlobaAPI.TotalPresentCountByday(selectedGrade, moment(selectedMonth).format('MM/yyyy'))
      .then(resp => {
        setTotalPresentData(resp?.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className='p-10'>
      <div className='flex flex-col md:flex-row items-center justify-between mb-5'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <div className='flex flex-wrap items-center gap-4 mt-4 md:mt-0'>
          <MonthSelection selectedMonth={(v) => setSelectedMonth(v)} />
          <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} selectedGrade={selectedGrade} selectedMonth={selectedMonth} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <BarChartComponent attendanceList={attendanceList} totalPresentList={totalPresentData} />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
