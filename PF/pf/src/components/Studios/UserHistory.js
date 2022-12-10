
import { useEffect, useContext, useState } from 'react'
import GetClasses from "./GetClasses"
import Button from '../Button'
import { TokenContext } from '../../contexts/TokenContext'
 
const History = () => {
    const [ oldClasses, setOldClasses ] = useState(null)
    const [page, setPage] = useState({next: null, prev: null})
    const [current, setCurrent] = useState(1)
    const { token } = useContext(TokenContext)

    useEffect( () => {
        
        if (current === 1) {
            fetch(`http://localhost:8000/studios/my_history/`, {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(response=>response.json())
            .then(data => {
                setOldClasses(data.results)
                setPage({next: data.next, prev: data.previous})
            })
        }
        else {
            fetch(`http://localhost:8000/studios/my_history/?page=${current}`, {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(response=>response.json())
            .then(data => {
                setOldClasses(data.results)
                setPage({next: data.next, prev: data.previous})
            })
        }
    }, [])

    return (<div className='container'>
        <div className='row horizontal-center'>
            <h2>Past Classes</h2>
        </div>
        {
            oldClasses
                ?<div className='row'>
                    <GetClasses fitnessClasses={oldClasses} />
                </div>
                :<></>
        }
        {page.prev ? <Button label="prev" onClick={() => setCurrent(current - 1)} /> : <></>}
        {page.next ? <Button label="next" onClick={() => setCurrent(current + 1)} /> : <></>}
        </div>)
    }
    


export default History