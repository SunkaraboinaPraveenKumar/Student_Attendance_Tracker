"use client"
import React, { useEffect, useState } from 'react'
import GlobaAPI from '../_services/GlobaAPI';

function GradeSelect({ selectedGrade }) {
    const [grades, setGrades] = useState([]);
    
    useEffect(() => {
        GetAllGradesList();
    }, []);

    useEffect(() => {
        if (grades.length > 0) {
            selectedGrade(grades[0].grade); // Automatically set the first grade
        }
    }, [grades]); // Dependency on grades array

    const GetAllGradesList = () => {
        GlobaAPI.GetAllGrades().then(resp => {
            setGrades(resp.data);
        });
    };

    return (
        <div className=''>
            <select
                className='p-2 border rounded-lg'
                onChange={(e) => selectedGrade(e.target.value)}
            >
                {
                    grades.map((item, index) => (
                        <option key={index} value={item.grade}>{item.grade}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default GradeSelect;
