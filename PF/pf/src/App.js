import { useState } from "react";
import Router  from "./components/Router/Router";
import { LocationContext } from "./contexts/LocationContext";
import { TokenContext } from "./contexts/TokenContext";
import { UserClassesContext } from "./contexts/ClassesContext";
import { SubscriptionContext } from "./contexts/SubscriptionContext";

function App() {
  const [location, setLocation] = useState({x:"", y:""})
  const [userClasses, setUserClasses] = useState([])
  const [subCxt] = useState({subid:undefined})
  const [token, setToken] = useState(null)

  return (<>
  <TokenContext.Provider value={{token, setToken}}>
    <UserClassesContext.Provider value={{userClasses, setUserClasses}}>
      <LocationContext.Provider value={{location, setLocation}}>
        <SubscriptionContext.Provider value={{subCxt}}>
          <Router/>
        </SubscriptionContext.Provider>
      </LocationContext.Provider>
    </UserClassesContext.Provider>
  </TokenContext.Provider>
  </>);
}

export default App;
