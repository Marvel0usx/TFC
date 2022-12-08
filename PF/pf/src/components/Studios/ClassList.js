import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Input from "../Input/Input"
import GetClasses from "./GetClasses"
 
const ClassList = () => {
    const [query, setQuery] = useState({name: "", coach: "", date: "", time_range: ""})
    const [fitnessClasses, setFitnessClasses] = useState([])
    const [search, setSearch] = useState(0)
    const [timeRange, setTimeRange] = useState({start: "", end:""})

    useEffect( () => {
            if (search > 0) { 
                fetch(`http://localhost:8000/studios/class/search/?name=${query.name}&coach=${query.coach}&date=${query.date}&time_range=${query.time_range}`)
                .then(response=>response.json())
                .then(data => setFitnessClasses(data.results))
            }
            console.log(query)
    }, [search])

    useEffect(() =>{
        if (timeRange.start && timeRange.end) {
            var range = timeRange.start + "-" + timeRange.end
            setQuery({...query, time_range: range})
        }
    }, [timeRange])

    const go = () => {
        setSearch(search + 1)
    }

    return (<>
        <h2>Search for classes</h2>
        <div>
            <Input title="Name" value={query.name} update={(value)=>setQuery({...query, name: value})} />
        </div>
        <div>
            <Input title="Coach" value={query.coach} update={(value)=>setQuery({...query, coach: value})} />
        </div>
        <div>
            <span>Date </span>
            <input type="date" onChange={(event) => setQuery({...query, date: event.target.value})}></input>
        </div>
        <div>
            <span>Time Range </span>
            <input type="time" onChange={(event) => setTimeRange({...timeRange, start: event.target.value})}></input>
            <span> to </span>
            <input type="time" onChange={(event) => setTimeRange({...timeRange, end: event.target.value})}></input>
        </div>
        <div>
            
        </div>
        <div>
            <Button label='Go' onClick={go}/>
        </div>
        <GetClasses fitnessClasses={fitnessClasses} />

        </>)
    }
    

export default ClassList