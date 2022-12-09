import { useState } from "react";
import Router  from "./components/Router/Router";
import { LocationContext } from "./contexts/LocationContext";
import { SubscriptionContext } from "./contexts/SubscriptionContext";

function App() {
  const [location, setLocation] = useState({x:"", y:""})
  const [subCxt] = useState({subid:undefined})

  return (<>

    <LocationContext.Provider value={{location, setLocation}}>
      <SubscriptionContext.Provider value={{subCxt}}>
        <Router/>
      </SubscriptionContext.Provider>
    </LocationContext.Provider>


  </>);
}

export default App;
