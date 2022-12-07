<<<<<<< HEAD
import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Input from "../Input/Input"
 
const ClassList = () => {
    const [query, setQuery] = useState({name: "", coach: "", date: "", time_range: ""})
    const [fitnessClasses, setFitnessClasses] = useState([])
    const [search, setSearch] = useState(0)

    useEffect( () => {
            if (search > 0) { 
                fetch(`http://localhost:8000/studios/class/search/?name=${query.name}&coach=${query.coach}&date=${query.date}&time_range=${query.time_range}`)
                .then(response=>response.json())
                .then(data => setFitnessClasses(data.results))
            }
            console.log(query)
    }, [search])

    const go = () => setSearch(search + 1)

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
            <Input title="Time Range" value={query.class} update={(value)=>setQuery({...query, class: value})} />
        </div>
        <div>
            <Button label='Go' onClick={go}/>
        </div>
        <GetClasses fitnessClasses={fitnessClasses} />

        </>)
    }
    
const GetClasses = ({ fitnessClasses }) => {
    if (fitnessClasses) {
        return (<>
            {fitnessClasses.map(fitnessClass => 
                <div>
                    <Link to={`/studios/class/${fitnessClass.id}/view`}> {fitnessClass.name} </Link>
                    <div className="coach"> Coach: {fitnessClass.coach} </div>
                    <div className="class-description"> Description: {fitnessClass.description} </div>
                    <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
                    <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
                </div>)}
        </>)
    }
    return <></>
}

=======
import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Input from "../Input/Input"
 
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

    const go = () => {
        setSearch(search + 1)
        var range = timeRange.start + "-" + timeRange.end
        setQuery({...query, time_range: range})
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
            <span>Start Time </span>
            <input type="time" onChange={(event) => setTimeRange({...timeRange, start: event.target.value})}></input>
        </div>
        <div>
            <span>End Time </span>
            <input type="time" onChange={(event) => setTimeRange({...timeRange, end: event.target.value})}></input>
        </div>
        <div>
            <Button label='Go' onClick={go}/>
        </div>
        <GetClasses fitnessClasses={fitnessClasses} />

        </>)
    }
    
const GetClasses = ({ fitnessClasses }) => {
    if (fitnessClasses) {
        return (<>
            {fitnessClasses.map(fitnessClass => 
                <div>
                    <Link to={`/studios/class/${fitnessClass.id}/view`}> {fitnessClass.name} </Link>
                    <div className="coach"> Coach: {fitnessClass.coach} </div>
                    <div className="class-description"> Description: {fitnessClass.description} </div>
                    <div className="keywords"> Keywords: {fitnessClass.keywords} </div>
                    <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
                </div>)}
        </>)
    }
    return <></>
}

>>>>>>> refs/rewritten/onto
export default ClassList