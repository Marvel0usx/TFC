import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import { LocationContext } from '../../contexts/LocationContext';
import Button from '../Button';
import Input from "../Input/Input"

const StudioView = () => {
    const [studio, setStudio] = useState({})
    const [classes, setClasses] = useState([])
    const [amenities, setAmenities] = useState([])
    const { location } = useContext(LocationContext)
    const [page, setPage] = useState({next: null, prev: null})
    const [current, setCurrent] = useState(1)

    const { studioID } = useParams();

    useEffect(() => {
        if (!location.x || !location.y) {
            fetch(`http://localhost:8000/studios/${studioID}/view/`)
            .then(response=>response.json())
            .then(data => {
                setStudio(data)
        })
        }
        else {
            fetch(`http://localhost:8000/studios/${studioID}/view/mylocation=${location.x},${location.y}`)
            .then(response=>response.json())
            .then(data => {
                setStudio(data)
            })
        }}, [location])


    useEffect(() => {
        if (current === 1) {
            fetch(`http://localhost:8000/studios/${studioID}/schedule/`)
            .then(response=>response.json())
            .then(data => {
                setClasses(data.results)
                setPage({next: data.next, prev: data.previous})
            })
        }
        else {
            fetch(`http://localhost:8000/studios/${studioID}/schedule/?page=${current}`)
            .then(response=>response.json())
            .then(data => {
                console.log(data)
                setClasses(data.results)
                setPage({next: data.next, prev: data.previous})
            })
        }
    }, [studio, current])

    useEffect(() => {
        fetch(`http://localhost:8000/studios/${studioID}/amenities/list/`)
        .then(response=> response.json()
            )
        .then(data => {
            setAmenities(data.results)
        })
    }, [studio])

    return (
    <>
    <h1> {studio.name} </h1>
        <div className="address"> Address: {studio.address} </div>
        <div className="postal-code"> Postal Code: {studio.postalCode} </div>
        <div className="phone-number"> Phone Number: {studio.phoneNumber} </div>
        <Directions studio={studio} />
        <div className="studio-photo-grid"> 
            <img className="studio-photo" src={studio.images} alt={studio.name}/>
        </div>
        <AmenitiesList amenities={amenities} />
        <ClassList classes={classes}/>
        {page.prev ? <Button label="prev" onClick={() => setCurrent(current - 1)} /> : <></>}
        {page.next ? <Button label="next" onClick={() => setCurrent(current + 1)} /> : <></>}
    </>
    )
}

const Directions = ({studio}) => {

    const { location, setLocation } = useContext(LocationContext)
    const [ longitude, setLongitude ] = useState("")
    const [ latitude, setLatitude ] = useState("")

    if (!location.x || !location.y) {
        return <div>
            <h4>Enter your location to get directions</h4>
            <div>
                <Input title="Longitude" value={longitude} update={(value)=>setLongitude(value)} />
            </div>
            <div>
                <Input title="Latitude" value={latitude} update={(value)=>setLatitude(value)} />
            </div>
            <div>
                <Button label="Get directions" onClick={() => setLocation({x: longitude, y:latitude})}/>
            </div>
        </div>
    }
    else {
        return <div>
            <h4>Enter your location to get directions</h4>
            <div>
                <Input title="Longitude" value={longitude} update={(value)=>setLongitude(value)} />
            </div>
            <div>
                <Input title="Latitude" value={latitude} update={(value)=>setLatitude(value)} />
            </div>
            <div>
                <Button label="Get directions" onClick={() => setLocation({x: longitude, y:latitude})}/>
                <a target="_blank" rel="noreferrer" className="directions" href={studio['link to directions']}>Directions</a>
        </div>
    </div>
    }
    
}



const AmenitiesList = ( { amenities } ) => {
    if (!amenities) {
        return <div>
            <h2>Amenities</h2>
            <div> None available at the moment</div>
        </div>
    }
    return <div>
        <h2>Amenities</h2>
        <div>{amenities.map(amenity => 
            <div>
                <div className="amenity"> {amenity.type} </div>
                <div className="quantity"> Quantity: {amenity.quantity} </div>
            </div>
            )}
        </div>
    </div>
}

const ClassList = ( { classes }) => {
    if (!classes) {
        return <div> 
            <h2>Upcoming Classes</h2>
            <div>None available at the moment</div>
        </div>
    }
    return <div>
        <h2>Upcoming Classes</h2>
        <div>{classes.map(fitnessClass => 
            <div>
                <Link to={`/studios/class/${fitnessClass.id}/view`}> {fitnessClass.name} </Link>
                <div className="coach"> Coach: {fitnessClass.coach} </div>
                <div className="class-time"> Time: {fitnessClass.startTime} to {fitnessClass.endTime} </div>
            </div>)}
        </div>
    </div>
}

export default StudioView