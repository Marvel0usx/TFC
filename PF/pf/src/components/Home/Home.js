import '../style.css'
import M from "materialize-css"

export const Home = () => {
    return<>
    <div className="container ">
        <div className="row " >
            <h1 className="col s12 homepage">Toronto Fitness Club</h1>
        </div>
        <div className="row homepage" >
            <img src="https://www.cs.toronto.edu/~kianoosh/courses/csc309/resources/images/tfc.png" alt="TFC Logo"></img>
        </div>
            
            <blockquote> Welcome to the Toronto Fitness Club. Our mission is to provide you with the best possible services with our
                myriads of modern studios and classes offered by professional coaches and trainers. Feel free to take a look
                at our studios and classes and register an account to enroll in our classes.
            </blockquote>
        <img className="image" src="https://images.adsttc.com/media/images/54b7/4f72/e58e/cea3/b400/0084/large_jpg/portada_003_North_Exterior_Dawn.jpg?1421299558" alt="Studio"></img>
    </div>
    </>
}
