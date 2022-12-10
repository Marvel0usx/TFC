import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { UserClassesContext } from '../../contexts/ClassesContext';
import Button from '../Button';
import { TokenContext } from '../../contexts/TokenContext';

const ClassView = () => {
    const [fitnessClass, setFitnessClass] = useState({})
    const [recurring, setRecurring] = useState("")
    const { userClasses, setUserClasses } = useContext(UserClassesContext)
    const [enrolled, setEnrolled] = useState(false)
    const { classID } = useParams();
    const [old, setOld] = useState("")
    const { token } = useContext(TokenContext)

    useEffect(() => {
        fetch(`http://localhost:8000/studios/class/${classID}/view/`)
        .then(response=>response.json())
        .then(data => {
            setFitnessClass(data)
            for (let i = 0; i < userClasses.length; i++) {
                if (classID === userClasses[i].id) {
                    setEnrolled(true)
                }
            }
        })
    }, [])

    useEffect(() => {
        if (!fitnessClass.baseClass) {
            setRecurring("NO")
        }
        else {
            setRecurring("YES")
        }        
        const start = new Date(fitnessClass.startTime)
        const now = new Date()
        if (start < now) {
            setOld(true)
        }
        else {
            setOld(false)
        }
    }, [fitnessClass])
    

    useEffect(() => {
        for (const userClass in userClasses) {
            if (userClass.id === classID) {
                setEnrolled(true)
            }
        }
    }, [userClasses])



    const enrollOne = () => {
        fetch(`http://localhost:8000/studios/class/${fitnessClass.id}/enroll_one`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.Success) {
                alert(data.Success)
            }
            else {
                alert(data.ERROR)
            }
        })
        updateUserClasses()
    }

    const enrollAll = () => {
        fetch(`http://localhost:8000/studios/class/${fitnessClass.id}/enroll_all`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.Success) {
                alert(data.Success)
            }
            else {
                alert(data.ERROR)
            }
        })
        updateUserClasses()
    }

    const dropOne = () => {
        fetch(`http://localhost:8000/studios/class/${fitnessClass.id}/drop_one`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.Success) {
                alert(data.Success)
            }
            else {
                alert(data.ERROR)
            }
        })
        updateUserClasses()
    }

    const dropAll = () => {
        fetch(`http://localhost:8000/studios/class/${fitnessClass.id}}/drop_all`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.Success) {
                alert(data.Success)
            }
            else {
                alert(data.ERROR)
            }
        })
        updateUserClasses()
    }

    const updateUserClasses = () => {
        fetch(`http://localhost:8000/studios/my_schedule/`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response=>response.json())
        .then(data => {
            setEnrolled(false)
            setUserClasses(data.results)
            console.log(data.results)
            for (let i = 0; i < data.results.length; i++) {
                if (data.results[i].id === parseInt(classID)) {
                    setEnrolled(true)
                    console.log("here")
                }
            }
        })
    }

    if (old) {
        return <>
        <h1> {fitnessClass.name} </h1>
        <div className="coach"> Coach: {fitnessClass.coach} </div>
        <div className="class-description"> Description: {fitnessClass.description} </div>
        <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
        <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
        <div className="recurrence"> Reccuring: {recurring}</div>
        <div>Old Class</div>
        </>
    }
    else if (!token) {
        return <>
        <h1> {fitnessClass.name} </h1>
        <div className="coach"> Coach: {fitnessClass.coach} </div>
        <div className="class-description"> Description: {fitnessClass.description} </div>
        <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
        <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
        <div className="recurrence"> Reccuring: {recurring}</div>
        <span>Log in to enroll in classes</span>
        </>

    }
    else {
        return (
            <>
            {console.log(enrolled)}
            <h1> {fitnessClass.name} </h1>
            <div className="coach"> Coach: {fitnessClass.coach} </div>
            <div className="class-description"> Description: {fitnessClass.description} </div>
            <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
            <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
            <div className="recurrence"> Reccuring: {recurring}</div>
            {enrolled
                ? <div>
                    <Button label="Drop" onClick={dropOne}></Button>
                    {recurring
                    ?<Button label="Drop All" onClick={dropAll}></Button>
                    : <></>}
                </div>
                : <div>
                    <Button label="Enroll" onClick={enrollOne}></Button>
                    {recurring
                    ?<Button label="Enroll All" onClick={enrollAll}></Button>
                    : <></>}
                    
                </div>
            }
            </>
        )
    }
}





export default ClassView