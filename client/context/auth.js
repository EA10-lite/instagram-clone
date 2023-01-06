import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children })=> {
    const { push } = useRouter();

    const login = (res) => {
        localStorage.setItem("ea10_instagram_user", JSON.stringify(res.data.data));

        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ token: res.headers['x-auth-token']})
        }).then(()=> push("/"))
    }

    const logout = () => {
        localStorage.removeItem("ea10_instagram_user");

        fetch("/api/auth/logout", {
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({})
        })

        push('/login');
    }

    return (
        <AuthContext.Provider value={{ login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;