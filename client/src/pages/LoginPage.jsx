import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    //console.log(setUser);

    async function loginUser(ev) {
        ev.preventDefault();
        try{
            const { data } = await axios.post('/login', {//In the Axios library, the response object contains the 'data' property that extracts the response body
                email,
                password,
            });

            // console.log(data);
            setUser(data); //Set the User state from UserContext component with the login credentials of user, if login successfully

            alert("Login Successful");
            setRedirect(true); //Set the redirect to true when users log in successfully

        }catch(e){
            alert("Login Unsuccessful");
        }
    }
    
    if (redirect){
        return <Navigate to={'/ '} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-center text-4xl mb-4 ">Login</h1>
                <form  className="max-w-md mx-auto" onSubmit={loginUser}> 
                    
                    <input 
                    type="email" 
                    placeholder="yourmail@gmail.com" 
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                    type="password" 
                    placeholder="password" 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="primary" >Login</button>

                    <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
                    </div>
                </form>

                
            </div>
            
        </div>
    );
}