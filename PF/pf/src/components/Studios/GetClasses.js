import {Link} from 'react-router-dom'

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

export default GetClasses