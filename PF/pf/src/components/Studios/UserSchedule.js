
import { useEffect, useContext, useState } from 'react'
import { UserClassesContext } from '../../contexts/ClassesContext'
import GetClasses from "./GetClasses"
import Button from '../Button'
import { TokenContext } from '../../contexts/TokenContext'

const Schedule = () => {
    const { userClasses, setUserClasses } = useContext(UserClassesContext)
    const [page, setPage] = useState({next: null, prev: null})
    const [current, setCurrent] = useState(1)
    const { token, setToken } = useContext(TokenContext)

    useEffect( () => {
        if (current === 1) {
            fetch(`http://localhost:8000/studios/my_schedule/`, {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(response=>response.json())
            .then(data => {
                setUserClasses(data.results)
                setPage({next: data.next, prev: data.previous})
            })
        }
        else {
            fetch(`http://localhost:8000/studios/my_schedule/?page=${current}`, {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(response=>response.json())
            .then(data => {
                setUserClasses(data.results)
                setPage({next: data.next, prev: data.previous})
            })
        }
    }, [current])

    return (<div className='container'>{console.log(current)}
            <div className='row horizontal-center'>
        <h2>Upcoming Classes</h2>
        </div>
        <div className='row'>
            <GetClasses fitnessClasses={userClasses} />
        </div>
        {page.prev ? <Button label="prev" onClick={() => setCurrent(current - 1)} /> : <></>}
        {page.next ? <Button label="next" onClick={() => setCurrent(current + 1)} /> : <></>}
        </div>)
    }
    


export default Schedule