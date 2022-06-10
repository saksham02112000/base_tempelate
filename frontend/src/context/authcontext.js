import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(()=>{
    //     if(loggedIn){
    //         window.location.pathname="/";
    //     }
    // },[loggedIn])

    useEffect(() => {
        const auth_token = localStorage.getItem("auth_token");
        fetch(`http://${process.env.REACT_APP_BASE_URL}/users/info/`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth_token}`
            },
        })
            .then((res) => {
                if(!res.ok) {
                    console.log("not ok");
                    logout();
                    // throw new Error(res.status);
                }
                else return res.json();
            })
            .then((data) => {
                if (data) {
                    setLoggedIn(true);
                    setUser({email: data.email, id: data.id, role: data.role});
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=> setIsLoading(false));
    },[]);

    const logout = () => {
        setLoggedIn(false);
        setUser(null);
        localStorage.setItem("auth_token", null);
        window.location.pathname = "/login";
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{ logout, loggedIn, user}}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}