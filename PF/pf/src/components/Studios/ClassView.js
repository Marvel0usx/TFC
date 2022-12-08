import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Button from '../Button';

const ClassView = () => {
    const [fitnessClass, setFitnessClass] = useState({})
    const [recurring, setRecurring] = useState("YES")

    const { classID } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/studios/class/${classID}/view/`)
        .then(response=>response.json())
        .then(data => {
            setFitnessClass(data)
            if (!fitnessClass.baseClass) {
                setRecurring("NO")
            }
        })
    }, [])

    const enrollOne = () => {
        fetch(`http://localhost:8000/studios/class/1/enroll_one`, {
            method: 'get',
            headers: {
                "Authorization": "Bearer token here",
            }
        })
    }

    const enrollAll = () => {
        fetch(`http://localhost:8000/studios/class/1/enroll_all`, {
            method: 'get',
            headers: {
                "Authorization": "Bearer token here",
            }
        })
    }

    return (
    <>
    <h1> {fitnessClass.name} </h1>
    <div className="coach"> Coach: {fitnessClass.coach} </div>
    <div className="class-description"> Description: {fitnessClass.description} </div>
    <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
    <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
    <div className="recurrence"> Reccuring: {recurring}</div>
    <Button label="Enroll" onClick={enrollOne}></Button>
    <Button label="Enroll All" onClick={enrollAll}></Button>
    </>
    )
}





export default ClassView