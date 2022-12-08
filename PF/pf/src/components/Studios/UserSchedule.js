
import { useState, useEffect } from 'react'
import GetClasses from "./GetClasses"
 
const Schedule = () => {
    const [fitnessClasses, setFitnessClasses] = useState([])

    useEffect( () => {
        fetch(`http://localhost:8000/studios/class/schedule`, {
            method: 'get',
            headers: {
                "Authorization": "Bearer token here",
            }
        })
        .then(response=>response.json())
        .then(data => setFitnessClasses(data.results))
    }, [])

    return (<>
        <h2>Upcoming Classes</h2>
        <GetClasses fitnessClasses={fitnessClasses} />

        </>)
    }
    


export default Schedule