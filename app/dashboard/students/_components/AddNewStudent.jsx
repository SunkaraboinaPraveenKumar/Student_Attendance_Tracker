"use client"
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobaAPI from '@/app/_services/GlobaAPI';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

function AddNewStudent({refreshData}) {
    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const [open, setOpen] = useState(false);
    const [grades, setGrades] = useState([]);
    useEffect(() => {
        GetAllGradesList();
    }, [])
    
    const GetAllGradesList = () => {
        GlobaAPI.GetAllGrades().then(resp => {
            setGrades(resp.data);
        })
    }
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const resp = await GlobaAPI.CreateNewStudent(data);
            // console.log(resp);
            if(resp?.data){
                setLoading(false);
                reset();
                toast('New Student Added!!');
                refreshData();
                setOpen(false);
            }

        } catch (err) {
            setLoading(false);
            reset();
            toast('Error Saving Student!!');
            setOpen(false);
            console.error('Error creating student:', err);
        }
    };
    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='py-3'>
                                    <label>FullName</label>
                                    <Input placeholder='Ex. Praveen Kumar'
                                        {...register('name', { required: true })}
                                    />
                                </div>
                                <div className='flex flex-col py-2'>
                                    <label>Select Grade</label>
                                    <select className='p-3 border rounded-lg'
                                        {...register('grade', { required: true })}
                                    >
                                        {
                                            grades.map((item, index) => (
                                                <option key={index} value={item.grade}>{item.grade}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='py-3'>
                                    <label>Contact Number</label>
                                    <Input type="number" placeholder='Ex. 9347160766'
                                        {...register('contact')}
                                    />
                                </div>
                                <div className='py-3'>
                                    <label>Address</label>
                                    <Input placeholder='JNTUH,Kukatpally,Hyd'
                                        {...register('address', { required: true })}
                                    />
                                </div>
                                <div className='flex gap-3 justify-end mt-5'>
                                    <Button type="button" onClick={() => setOpen(false)} variant='ghost'>Cancel</Button>
                                    <Button type="submit"
                                    disabled={loading}
                                    >
                                        {loading&&<LoaderIcon className='animate-spin'/>}
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewStudent