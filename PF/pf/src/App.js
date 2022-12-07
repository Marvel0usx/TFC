import { useState } from "react";
import Router  from "./components/Router/Router";
import { LocationContext } from "./contexts/LocationContext";

function App() {
  const [location, setLocation] = useState({x:"", y:""})

  return (<>
    <LocationContext.Provider value={{location, setLocation}}>
      <Router/>
    </LocationContext.Provider>
  </>);
}

export default App;
