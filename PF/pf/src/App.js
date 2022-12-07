import { useState } from "react";
import Router  from "./components/Router/Router";
import { LocationContext } from "./contexts/LocationContext";
<<<<<<< HEAD
import { UserClassesContext } from "./contexts/ClassesContext";

function App() {
  const [location, setLocation] = useState({x:"", y:""})
  const [userClasses, setUserClasses] = useState([])

  return (<>
    <UserClassesContext.Provider value={{userClasses, setUserClasses}}>
      <LocationContext.Provider value={{location, setLocation}}>
        <Router/>
      </LocationContext.Provider>
    </UserClassesContext.Provider>
=======

function App() {
  const [location, setLocation] = useState({x:"", y:""})

  return (<>
    <LocationContext.Provider value={{location, setLocation}}>
      <Router/>
    </LocationContext.Provider>
>>>>>>> 9ac344e (rebase from main)
  </>);
}

export default App;
