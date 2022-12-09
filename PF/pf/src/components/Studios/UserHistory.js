
import { useEffect, useContext } from 'react'
import { UserClassesContext } from '../../contexts/ClassesContext'
import GetClasses from "./GetClasses"
 
const History = () => {
    const { userClasses, setUserClasses } = useContext(UserClassesContext)
    useEffect( () => {
        fetch(`http://localhost:8000/studios/class/history`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${"tokenhere"}`,
            }
        })
        .then(response=>response.json())
        .then(data => setUserClasses(data.results))
    }, [])

    return (<>
        <h2>Past Classes</h2>
        <GetClasses fitnessClasses={userClasses} />
        </>)
    }
    


export default History