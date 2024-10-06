import { getUniqueRecord } from '@/app/_services/service';
import { da } from 'date-fns/locale';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({ attendanceList }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (attendanceList) {
            const totalStu = getUniqueRecord(attendanceList);
            if (totalStu.length > 0) {
                const today = moment().format('D');
                const PresentPercent = (attendanceList.length / (totalStu.length * Number(today))) * 100;
                setData([
                    {
                        name:'Present Percent',
                        value:Number(Number(PresentPercent).toFixed(2)),
                        fill:'#4c8cf8'
                    },
                    {
                        name:'Absent Percent',
                        value:Number(100-PresentPercent.toFixed(2)),
                        fill:'#1fe6d1'
                    }
                ])
            }
        }
    }, [attendanceList]);

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-xl'>Monthly Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent