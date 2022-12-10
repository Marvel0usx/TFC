import { useState } from "react";
import Router  from "./components/Router/Router";
import { LocationContext } from "./contexts/LocationContext";
import { UserClassesContext } from "./contexts/ClassesContext";

import { UserClassesContext } from "./contexts/ClassesContext";
import { SubscriptionContext } from "./contexts/SubscriptionContext";

function App() {
  const [location, setLocation] = useState({x:"", y:""})
  const [userClasses, setUserClasses] = useState([])
  const [subCxt] = useState({subid:undefined})

  return (<>
    <UserClassesContext.Provider value={{userClasses, setUserClasses}}>
      <LocationContext.Provider value={{location, setLocation}}>
        <SubscriptionContext.Provider value={{subCxt}}>
          <Router/>
        </SubscriptionContext.Provider>
      </LocationContext.Provider>
    </UserClassesContext.Provider>
  </>);
}

export default App;
