import axios from "axios"; //A popular javascript library for making http requests
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready,setReady] = useState(false); //If does't have the "ready" state, the login page will always load from the account page the "if" check(in AccountPage.jsx)is executed before the GET request in the useEffect below

    useEffect(() => {
        if (!user){
            axios.get('/profile').then(({data}) => { //In the Axios library, the response object contains the 'data' property that extracts the response body
                setUser(data);
                setReady(true);
                //console.log('ready is set')
            })
        }

    },[]);

    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>

    );
}
