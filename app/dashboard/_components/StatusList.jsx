import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

const StatusList = ({ attendanceList, selectedMonth, selectedGrade }) => {
    const [totalStudent, setTotalStudent] = useState([]);
    const [presentPercent, setPresentPercent] = useState(0);

    useEffect(() => {
        if (attendanceList && attendanceList.length > 0) {
            const totalStu = getUniqueRecord(attendanceList); // Get unique students
            setTotalStudent(totalStu);

            // Calculate present percent
            if (totalStu.length > 0) {
                const today = moment().format('D'); // Get current day
                const PresentPercent = (attendanceList.length / (totalStu.length * Number(today))) * 100;

                setPresentPercent(PresentPercent);
            } else {
                // Reset present percent if no unique students
                setPresentPercent(0);
            }
        } else {
            // Reset values when attendanceList is empty or undefined
            setTotalStudent([]);
            setPresentPercent(0);
        }
    }, [attendanceList,selectedMonth,selectedGrade]);

    return (
        <div className='my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <Card icon={<GraduationCap />} title={'Total Student'} value={totalStudent.length} />
            <Card icon={<TrendingUp />} title={'Total Present'} value={presentPercent.toFixed(2) + "%"} />
            <Card icon={<TrendingDown />} title={'Total Absent'} value={(100 - presentPercent).toFixed(2) + "%"} />
        </div>
    );
};

export default StatusList;
