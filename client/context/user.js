import { createContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import urls from "../utils/urls";

export const UserContext = createContext();

const UserContextProvider = ({ children })=> {
    const [ user_data, set_user_data ] = useState();
    const { data } = useApi(urls.profile_url);

    useEffect(()=> {
        console.log(data);
        set_user_data(data)
    },[data])

    useEffect(()=> {
        const user = localStorage.getItem("ea10_instagram_user") !== "undefined" ? JSON.parse(localStorage.getItem("ea10_instagram_user")) : {};
        set_user_data(user);
    }, [])

    return (
        <UserContext.Provider value={{ user_data }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;