import { useContext, useState } from "react"
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage(){
    const {user,ready} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    //console.log('Account page')


    let {subpage} = useParams();

    if (subpage === undefined){
        subpage = 'profile';
    }

   function linkClasses(type=null){ //'type' is a name I chose for the parameter
        
        //console.log('inside linkClass '+ type);
        let classes = 'py-2 px-6';
        if(type === subpage){

            classes += ' bg-primary text-white rounded-full';

        }

        return classes;
   }

   async function logout(){
        await axios.post('/logout');
        setRedirect('/');
   }
  
    //The ready state is set to wait for the cookie verification conducted in the UserContext component
    if(!ready){
        //console.log('Not ready');
        return 'Loading...';
    }

    //If no user is logged in but navigated to the account page, go to login page
    //If does't have the "ready" state, the login page will always load because this "if" check is executed before the GET request in the UserContext
    if (ready && !user){ 
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
            
            {/* in tut there is 'w-full' that I didn't add below */}
            <nav className="flex justify-center mt-8 gap-2 w-full mb-8"> 
                {/*Passing functions to the 'className' attribute allows you to set the CSS class name based on the returned value of the function. The function is called when the 'Link' tag is rendered, so the code below will call linkClasses 3 times  */}
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodation</Link>
                
            </nav>

            {subpage === 'profile' && (
                <div className="text-center mx-auto max-w-lg">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary mt-2 max-w-sm">
                        Logout
                    </button>

                </div>
            )} 
        </div>
    );
}