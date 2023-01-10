import { createContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children })=> {
    const { push } = useRouter();

    const login = (res, get_user) => {
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ token: res.data.data})
        })
        .then(()=> get_user())
        .then(res=> localStorage.setItem("user", JSON.stringify(res.data.data)))
        .catch(err=> console.log("Something failed.", err));
    }

    const logout = () => {
        fetch("/api/auth/logout", {
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({})
        })
        .then(()=> push("/login"))
        .catch(()=> toast.error("Failed to log out!"))
    }


    return (
        <AuthContext.Provider value={{ login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;