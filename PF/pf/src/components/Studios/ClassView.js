<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
=======
import React, { useState, useEffect, useContext } from 'react'
>>>>>>> a110f15 (updated authorization placeholder code)
import { useParams } from 'react-router-dom';
import { UserClassesContext } from '../../contexts/ClassesContext';
import Button from '../Button';

const ClassView = () => {
    const [fitnessClass, setFitnessClass] = useState({})
    const [recurring, setRecurring] = useState("")
    const { userClasses, setUserClasses } = useContext(UserClassesContext)
    const [enrolled, setEnrolled] = useState(false)
    const { classID } = useParams();
    const [old, setOld] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8000/studios/class/${classID}/view/`)
        .then(response=>response.json())
        .then(data => {
            setFitnessClass(data)
        })
    }, [enrolled])

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
        fetch(`http://localhost:8000/studios/class/1/enroll_one`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        .then(response=>response.json())
        .then(data=>console.log(data))

    }

    const enrollAll = () => {
        fetch(`http://localhost:8000/studios/class/1/enroll_all`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        updateUserClasses()
    }

    const dropOne = () => {
        fetch(`http://localhost:8000/studios/class/1/drop_one`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        updateUserClasses()
    }

    const dropAll = () => {
        fetch(`http://localhost:8000/studios/class/1/drop_all`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        updateUserClasses()
    }

    const updateUserClasses = () => {
        fetch(`http://localhost:8000/studios/class/schedule`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        .then(response=>response.json())
        .then(data => setUserClasses(data.results))
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
    else {
        return (
            <>
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





=======
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

    return (
    <>
    <h1> {fitnessClass.name} </h1>
    <div className="coach"> Coach: {fitnessClass.coach} </div>
    <div className="class-description"> Description: {fitnessClass.description} </div>
    <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
    <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
    <div className="recurrence"> Reccuring: {recurring}</div>
    <Button label="Enroll"></Button>
    <Button label="Enroll All"></Button>
    </>
    )
}





>>>>>>> refs/rewritten/onto
export default ClassView