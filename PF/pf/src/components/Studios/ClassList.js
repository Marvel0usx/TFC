import Button from "../Button"
import { useState, useEffect } from 'react'
import Input from "../Input/Input"
import GetClasses from "./GetClasses"
import M from "materialize-css"
import '../style.css'
 
const ClassList = () => {
    const [query, setQuery] = useState({name: "", coach: "", date: "", time_range: ""})
    const [fitnessClasses, setFitnessClasses] = useState([])
    const [search, setSearch] = useState(0)
    const [timeRange, setTimeRange] = useState({start: "", end:""})
    const [page, setPage] = useState({next: null, prev: null})
    const [current, setCurrent] = useState(1)

    useEffect( () => {
            if (search > 0) { 
                fetch(`http://localhost:8000/studios/class/search/?name=${query.name}&coach=${query.coach}&date=${query.date}&time_range=${query.time_range}&page=${current}`)
                .then(response=>response.json())
                .then(data => {
                    setPage({next: data.next, prev: data.previous})
                    setFitnessClasses(data.results)
                })
            }
    }, [search, current])

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
    <div className="container">
        <h2>Search for classes</h2>
        <div className="row">
            <Input title="Name" className="col s4" value={query.name} update={(value)=>setQuery({...query, name: value})} />
        </div>
        <div className="row">
            <Input title="Coach" className="col s4" value={query.coach} update={(value)=>setQuery({...query, coach: value})} />
        </div>
        <div className="row">
            <span className="col s1">Date </span>
            <input type="date" className="col s2" onChange={(event) => setQuery({...query, date: event.target.value})}></input>
        </div>
        <div className="row">
            <span className="col s1">Time Range </span>
            <input type="time" className="col s1" onChange={(event) => setTimeRange({...timeRange, start: event.target.value})}></input>
            <span className="col s1"> to </span>
            <input type="time" className="col s1" onChange={(event) => setTimeRange({...timeRange, end: event.target.value})}></input>
        </div>
        <div className="row">
            <Button label='Go' onClick={go}/>
        </div>
        <div className="row">
        <GetClasses fitnessClasses={fitnessClasses}/>
        </div>
        {console.log(page.prev)}
        {page.prev ? <Button label="prev" onClick={() => setCurrent(current - 1)} /> : <></>}
        {page.next ? <Button label="next" onClick={() => setCurrent(current + 1)} /> : <></>}
    </div>
        </>)
    }
    

export default ClassList