
import { useEffect, useContext } from 'react'
import { UserClassesContext } from '../../contexts/ClassesContext'
import GetClasses from "./GetClasses"
 
const Schedule = () => {
    const { userClasses, setUserClasses } = useContext(UserClassesContext)

    useEffect( () => {
        fetch(`http://localhost:8000/studios/class/schedule`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        .then(response=>response.json())
        .then(data => setUserClasses(data.results))
    }, [])

    return (<>
        <h2>Upcoming Classes</h2>
        <GetClasses fitnessClasses={userClasses} />

        </>)
    }
    


export default Schedule