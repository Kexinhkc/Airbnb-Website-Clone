import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(ev){//This ev(event) refers to the submit action event
        ev.preventDefault(); //To prevent browser from submitting the form(default behaviour when a form is submbitted). If doesn't have this line, there will be a  full page reload
        try{
            await axios.post('/register',{
                name,
                email,
                password,
            });  
            alert('Registration Successful');
        }catch(e){
            alert('Registration Fails');
        }
        
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-center text-4xl mb-4 ">Register</h1>
                <form  className="max-w-md mx-auto" onSubmit={registerUser}> 
                    <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}/>

                    <input 
                    type="email" 
                    placeholder="yourmail@gmail.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                    <input 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>

                    <button className="primary" >Register </button>

                    <div className="text-center py-2 text-gray-500">
                    Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>

                
            </div>
            
        </div>
    );
}