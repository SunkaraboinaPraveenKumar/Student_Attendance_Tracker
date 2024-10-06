import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import GlobaAPI from '@/app/_services/GlobaAPI';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];
function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState();
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'))
    // console.log(numberOfDays);
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1)
    // console.log(daysArray);
    const [colDef, setColDef] = useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true },
    ]);
    useEffect(() => {
        if (attendanceList) {
            const userList = getUniqueRecord();
            setRowData(userList);
            daysArray?.forEach((date) => {
                setColDef(prevData => [
                    ...prevData,
                    { field: date.toString(), width: 50, editable: true }
                ])
                userList?.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date);
                })
            })
        }
    }, [attendanceList])




    const isPresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId);
        return result ? true : false;
    }
    // used to get unique distinct user list
    const getUniqueRecord = () => {
        const uniqueRecord = []
        const existingUser = new Set();

        attendanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });
        return uniqueRecord;
    }

    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/yyyy')
        console.log(day, studentId, presentStatus);
        if (presentStatus) {
            const data = {
                studentId: studentId,
                present: presentStatus,
                day: day,
                date: date
            }
            GlobaAPI.MarkAttendance(data).then(resp => {
                // console.log(resp);
                toast(`StudentId: ${studentId} Marked as Present`);
            })
        }
        else {
            GlobaAPI.MarkAbsent(studentId, day, date)
                .then(resp => {
                    toast(`StudentId: ${studentId} Marked as Absent`);
                })
        }
    }


    return (
        <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDef}
                onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    )
}

export default AttendanceGrid