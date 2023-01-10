import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./auth";

export const UserContext = createContext();

const UserContextProvider = ({ children })=> {
    const { logout } = useContext(AuthContext);

    const [ user_data, set_user_data ] = useState();

    useEffect(()=> {
        const user = localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem("user")) : {};
        if(!user || user === {}){
            logout();
        }
        set_user_data(user);
    }, [])

    return (
        <UserContext.Provider value={{ user_data }}>
            { user_data && children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;