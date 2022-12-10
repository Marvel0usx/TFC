import Button from "../Button"
import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import Input from "../Input/Input"
import { LocationContext } from "../../contexts/LocationContext"
import M from "materialize-css"
 
const StudioList = () => {
    const { location, setLocation } = useContext(LocationContext)
    const [query, setQuery] = useState({name: "", coach: "", amenity: "", class: ""})
    const [studios, setStudios] = useState([])
    const [search, setSearch] = useState(0)
    const [mode, setMode] = useState(1)
    const [page, setPage] = useState({query: {next: null, prev: null}, location:{next: null, prev: null}} )
    const [current, setCurrent] = useState({location: 1, query: 1})

    useEffect( () => {
        if (mode === 0) {
            if (current === 1) {
                fetch(`http://localhost:8000/studios/list/mylocation=${location.x},${location.y}`)
                .then(response=>response.json())
                .then(data => {
                    setStudios(data.results)
                    setPage({...page, location: {next: data.next, prev: data.previous}})
                })
            }
            else {
                fetch(`http://localhost:8000/studios/list/mylocation=${location.x},${location.y}?page=${current.location}`)
                .then(response=>response.json())
                .then(data => {
                    setStudios(data.results)
                    setPage({...page, location: {next: data.next, prev: data.previous}})
                })
            }
        }

        else {
            fetch(`http://localhost:8000/studios/search/?name=${query.name}&coach=${query.coach}&amenity=${query.amenity}&class=${query.class}&page=${current.query}`)
            .then(response=>response.json())
            .then(data => setStudios(data.results))
        }
    }, [search, current.location, current.query])


    const go = () => {
        setSearch(search + 1)
    }

    const searchClosest = () => setMode(0)
    const searchSpecific = () => setMode(1)

    if (mode === 0) {

        return (<>
        <div className="container">
            <Button label="Search for a studio" onClick={searchSpecific}></Button>
            <Button label="Filter by closest" onClick={searchClosest}></Button>
            
            <div>
                <Input title="Longitude" value={location.x} update={(value)=>setLocation({...location, x: value})} />
            </div>
            <div>
                <Input title="Latitude" value={location.y} update={(value)=>setLocation({...location, y: value})} />
            </div>
            <div>
                <Button label='Go' onClick={go}/>
            </div>
            <div>
            <div className="row">
            {studios.map(studio => 
                <div className="col s4">
                    <Link to={`/studios/${studio.id}`}> {studio.name} </Link>
                    <div className="address"> Address: {studio.address} </div>
                    <div className="phone-number"> Phone Number: {studio.phoneNumber} </div>
                    <img className="studio-photo" alt={"image of " + studio.name}/>
                </div>
            )
            }
            </div>
        {page.location.prev ? <Button label="prev" onClick={() => setCurrent({...current, location: current.location - 1})} /> : <></>}
        {page.location.next ? <Button label="next" onClick={() => setCurrent({...current, location: current.location + 1})} /> : <></>}
        </div>
        </div>
            </>)

    }

    else {
        return (<>
        <div className='container'>
            <Button label="Search for a studio" onClick={searchSpecific}></Button>
            <Button label="Filter by closest" onClick={searchClosest}></Button>
            <div>
                <Input title="Name" value={query.name} update={(value)=>setQuery({...query, name: value})} />
            </div>
            <div>
                <Input title="Coach" value={query.coach} update={(value)=>setQuery({...query, coach: value})} />
            </div>
            <div>
                <Input title="Amenity" value={query.amenity} update={(value)=>setQuery({...query, amenity: value})} />
            </div>
            <div>
                <Input title="Class" value={query.class} update={(value)=>setQuery({...query, class: value})} />
            </div>
            <div>
                <Button label='Go' onClick={go}/>
            </div>
        <div className="row">
            {studios.map(studio => 
                <div className="col s4">
                    <Link className="Link" to={`/studios/${studio.id}`} > {studio.name} </Link>
                    <div className="address"> Address: {studio.address} </div>
                    <div className="phone-number"> Phone Number: {studio.phoneNumber} </div>
                    <img className="studio-photo" src={studio.images} alt={"image of " + studio.name}/>
                </div>)
                }
        </div>
            
        {page.query.prev ? <Button label="prev" onClick={() => setCurrent({...current, location: current.query - 1})} /> : <></>}
        {page.query.next ? <Button label="next" onClick={() => setCurrent({...current, location: current.query + 1})} /> : <></>}
            
        </div>
        </>)
    }
    
}


export default StudioList