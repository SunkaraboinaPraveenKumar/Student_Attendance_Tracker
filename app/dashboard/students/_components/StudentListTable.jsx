import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from '@/components/ui/button';
import { GraduationCap, Search, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobaAPI from '@/app/_services/GlobaAPI';
import { toast } from 'sonner';
import Card from '../../_components/Card';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function StudentListTable({ studentList, refreshData }) {

    const [searchInput, setSearchInput] = useState();
    
    const handleDelete = (id) => {
        const result = GlobaAPI.DeleteStudentRecord(id).then(resp => {
            if (resp) {
                toast("Record Deleted Successfully!");
                refreshData();
            }
        })
    }

    const CustomButton = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant='destructive'><Trash /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the record
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(props?.data?.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    const [colDef, setColDef] = useState([
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "address", filter: true },
        { field: "contact", filter: true },
        { field: 'action', cellRenderer: CustomButton }
    ]);

    const [rowData, setRowData] = useState();
    useEffect(() => {
        studentList && setRowData(studentList);
    }, [studentList])

    return (
        <div className='my-7'>
            {/* Card component with dark mode support */}
            <Card icon={<GraduationCap />} title={'Total Student'} value={studentList ? studentList.length : 0} />

            <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
                {/* Search Input with dark mode */}
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm mt-5 
                bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'>
                    <Search className='text-gray-500 dark:text-gray-400' />
                    <input
                        type="text" 
                        placeholder='Search on Anything....' 
                        className='outline-none w-full bg-transparent text-gray-900 dark:text-gray-300'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>

                {/* AgGridReact Table */}
                <AgGridReact
                    quickFilterText={searchInput}
                    rowData={rowData}
                    columnDefs={colDef}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    )
}

export default StudentListTable;
