import { useContext } from "react"
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

export default function AccountPage(){
    const {user,ready} = useContext(UserContext);


    let {subpage} = useParams();

    if (subpage === undefined){
        subpage = 'profile';
    }

   function linkClasses(type=null){ //'type' is a name I chose for the parameter
        
    console.log('inside linkClass '+ type);
        let classes = 'py-2 px-6';
        if(type === subpage){

            classes += ' bg-primary text-white rounded-full';

        }

        return classes;
   }
  

    if(!ready){
        return 'Loading...';
    }

    //If no user is logged in but navigated to the account page, go to login page
    //If does't have the "ready" state, the login page will always load because this "if" check is executed before the GET request in the UserContext
    if (ready && !user){ 
        return(
            <Navigate to={'/login'} />
        );

    }

   

    return (
        <div>
            {/* in tut there is 'w-full' that I didn't add below */}
            <nav className="flex justify-center mt-8 gap-2 "> 
                {/*Passing functions to the 'className' attribute allows you to set the CSS class name based on the returned value of the function. The function is called when the 'Link' tag is rendered, so the code below will call linkClasses 3 times  */}
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodation</Link>
                
            </nav>
        </div>
    );
}