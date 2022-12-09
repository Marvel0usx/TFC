import { createContext } from "react";

export const UserClassesContext = createContext({
    userClasses: [],
    setUserClasses: () => {},
})