import { useContext, useState } from "react"
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage(){
    const {user,ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    //console.log('Account page')

    console.log("at Account Page");

    let {subpage} = useParams();

    if (subpage === undefined){
        subpage = 'profile';
    }

   async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
   }
  
    //The ready state is set to wait for the cookie verification conducted in the UserContext component
    if(!ready){
        //console.log('Not ready');
        return 'Loading...';
    }

    //If no user is logged in but navigated to the account page, go to login page
    //If does't have the "ready" state, the login page will always load because this "if" check is executed before the GET request in the UserContext.jsx
    if (ready && !user && !redirect){ 
        //console.log('Not logged in')
        return(
            <Navigate to={'/login'} />
        );

    }

    if (redirect){
        
        return <Navigate to={redirect}/>;
    }

   

    return (
        <div>
            <AccountNav />

            {subpage === 'profile' && (
                <div className="text-center mx-auto max-w-lg">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary mt-2 max-w-sm">
                        Logout
                    </button>

                </div>
            )} 

            {subpage === 'places' && (
                <div>
                    
                    <PlacesPage />
                </div>
            )}
        </div>
    );
}