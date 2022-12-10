
import { useEffect, useContext, useState } from 'react'
import { UserClassesContext } from '../../contexts/ClassesContext'
import GetClasses from "./GetClasses"
import Button from '../Button'
 
const History = () => {
    const { userClasses, setUserClasses } = useContext(UserClassesContext)
    const [page, setPage] = useState({next: null, prev: null})
    const [current, setCurrent] = useState(1)

    useEffect( () => {
        
        if (current === 1) {
            fetch(`http://localhost:8000/studios/class/history/`, {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${"tokenhere"}`,
                }
            })
            .then(response=>response.json())
            .then(data => {
                setUserClasses(data.results)
                setPage({...page, location: {next: data.next, prev: data.prev}})
            })
        }
        else {
            fetch(`http://localhost:8000/studios/class/history/?page=${current}`, {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${"tokenhere"}`,
                }
            })
            .then(response=>response.json())
            .then(data => {
                setUserClasses(data.results)
                setPage({...page, location: {next: data.next, prev: data.prev}})
            })
        }
    }, [])

    return (<>
        <h2>Past Classes</h2>
        <GetClasses fitnessClasses={userClasses} />
        {page.prev ? <Button label="prev" onClick={() => setCurrent(current - 1)} /> : <></>}
        {page.next ? <Button label="next" onClick={() => setCurrent(current + 1)} /> : <></>}
        </>)
    }
    


export default History